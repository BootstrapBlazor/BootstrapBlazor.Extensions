// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;
using Opc.Ua.Client;

namespace BootstrapBlazor.OpcUa;

sealed class OpcUaServer : IOpcUaServer
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly Dictionary<string, OpcUaSubscription> _subscriptions = [];
#if NET8_0_OR_GREATER
    private readonly ITelemetryContext _telemetry = DefaultTelemetry.Create(_ => { });
#endif
    private ISession? _session;
    private bool _disposed;

    public bool IsConnected => _session?.Connected == true;

    public string? EndpointUrl { get; private set; }

    public async Task<bool> ConnectAsync(string endpointUrl, OpcUaConnectionOptions? options = null, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        Guard.ThrowIfNullOrWhiteSpace(endpointUrl, nameof(endpointUrl));

        options ??= new OpcUaConnectionOptions();
        ValidateOptions(options);
        var configuration = options.Configuration ?? CreateConfiguration(options);
#if NET8_0_OR_GREATER
        await configuration.ValidateAsync(ApplicationType.Client, cancellationToken);
        var applicationCertificate = await configuration.SecurityConfiguration.FindApplicationCertificateAsync(
            configuration.ApplicationUri,
            true,
            _telemetry,
            cancellationToken);
#else
        await configuration.Validate(ApplicationType.Client);
        var applicationCertificate = await configuration.SecurityConfiguration.ApplicationCertificate.Find(true, configuration.ApplicationUri);
#endif

        if (options.UseSecurity && applicationCertificate is null)
        {
            throw new InvalidOperationException("The OPC UA application certificate with a private key was not found.");
        }

        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            await DisconnectCoreAsync(cancellationToken);

#if NET8_0_OR_GREATER
            var endpointDescription = await CoreClientUtils.SelectEndpointAsync(
                configuration,
                endpointUrl,
                options.UseSecurity,
                options.OperationTimeout,
                _telemetry,
                cancellationToken);
#else
            var endpointDescription = CoreClientUtils.SelectEndpoint(configuration, endpointUrl, options.UseSecurity, options.OperationTimeout);
#endif
            var endpointConfiguration = EndpointConfiguration.Create(configuration);
            endpointConfiguration.OperationTimeout = options.OperationTimeout;
            var endpoint = new ConfiguredEndpoint(null, endpointDescription, endpointConfiguration);

#if NET8_0_OR_GREATER
            var sessionFactory = new DefaultSessionFactory(_telemetry);
#else
            var sessionFactory = DefaultSessionFactory.Instance;
#endif
            _session = await sessionFactory.CreateAsync(
                configuration,
                endpoint,
                false,
                options.SessionName,
                options.SessionTimeout,
                options.Identity,
                options.PreferredLocales,
                cancellationToken);

            EndpointUrl = endpointUrl;
            return _session.Connected;
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task DisconnectAsync(CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            await DisconnectCoreAsync(cancellationToken);
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<IReadOnlyList<OpcUaReadItem>> ReadAsync(IEnumerable<string> nodeIds, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        ArgumentNullException.ThrowIfNull(nodeIds);
        var ids = nodeIds.Select(ParseNodeId).ToArray();

        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            var session = GetSession();
            var nodesToRead = new ReadValueIdCollection(ids.Select(nodeId => new ReadValueId
            {
                NodeId = nodeId,
                AttributeId = Attributes.Value
            }));

            var response = await session.ReadAsync(null, 0, TimestampsToReturn.Both, nodesToRead, cancellationToken);
            ClientBase.ValidateResponse(response.Results, nodesToRead);
            ClientBase.ValidateDiagnosticInfos(response.DiagnosticInfos, nodesToRead);

            return ids.Select((nodeId, index) =>
            {
                var value = response.Results[index];
                return new OpcUaReadItem(nodeId.ToString(), value.Value, value.StatusCode, value.SourceTimestamp, value.ServerTimestamp);
            }).ToArray();
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<IReadOnlyList<OpcUaWriteItem>> WriteAsync(IEnumerable<OpcUaWriteItem> items, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        ArgumentNullException.ThrowIfNull(items);
        var itemList = items.ToArray();
        var nodesToWrite = new WriteValueCollection(itemList.Select(item =>
        {
            ArgumentNullException.ThrowIfNull(item);
            return new WriteValue
            {
                NodeId = ParseNodeId(item.NodeId),
                AttributeId = Attributes.Value,
                Value = new DataValue(new Variant(item.Value))
            };
        }));

        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            var session = GetSession();
            var response = await session.WriteAsync(null, nodesToWrite, cancellationToken);
            ClientBase.ValidateResponse(response.Results, nodesToWrite);
            ClientBase.ValidateDiagnosticInfos(response.DiagnosticInfos, nodesToWrite);

            return itemList.Select((item, index) => item with { StatusCode = response.Results[index] }).ToArray();
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<IReadOnlyList<OpcUaBrowseElement>> BrowseAsync(string nodeId, OpcUaBrowseOptions? options = null, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        var parsedNodeId = ParseNodeId(nodeId);
        options ??= new OpcUaBrowseOptions();

        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            var session = GetSession();
            var (references, errors) = await session.ManagedBrowseAsync(
                null,
                null,
                [parsedNodeId],
                options.MaxReferencesReturned,
                options.BrowseDirection,
                options.ReferenceTypeId,
                options.IncludeSubtypes,
                options.NodeClassMask,
                cancellationToken);

            if (errors.Count > 0 && ServiceResult.IsBad(errors[0]))
            {
                throw new ServiceResultException(errors[0]);
            }

            return references[0].Select(reference =>
            {
                var resolvedNodeId = ExpandedNodeId.ToNodeId(reference.NodeId, session.NamespaceUris);
                return new OpcUaBrowseElement(
                    resolvedNodeId?.ToString() ?? reference.NodeId.ToString(),
                    reference.BrowseName.ToString(),
                    reference.DisplayName.Text,
                    reference.NodeClass,
                    reference.ReferenceTypeId.ToString(),
                    reference.TypeDefinition?.ToString());
            }).ToArray();
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<IOpcUaSubscription> CreateSubscriptionAsync(string name, int publishingInterval = 1000, bool active = true, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        Guard.ThrowIfNullOrWhiteSpace(name, nameof(name));
        if (publishingInterval <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(publishingInterval));
        }

        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            var session = GetSession();
            if (_subscriptions.ContainsKey(name))
            {
                throw new InvalidOperationException($"An OPC UA subscription named '{name}' already exists.");
            }

            var sdkSubscription = new Subscription(session.DefaultSubscription)
            {
                DisplayName = name,
                PublishingInterval = publishingInterval,
                PublishingEnabled = active
            };
            if (!session.AddSubscription(sdkSubscription))
            {
                throw new InvalidOperationException($"Unable to add OPC UA subscription '{name}' to the current session.");
            }

            try
            {
                await sdkSubscription.CreateAsync(cancellationToken);
            }
            catch (Exception exception)
            {
                Exception? cleanupException = null;
                try
                {
                    if (sdkSubscription.Created)
                    {
                        await sdkSubscription.DeleteAsync(true, CancellationToken.None);
                    }
                    await session.RemoveSubscriptionAsync(sdkSubscription, CancellationToken.None);
                }
                catch (Exception ex)
                {
                    cleanupException = ex;
                }
                finally
                {
                    sdkSubscription.Dispose();
                }
                if (cleanupException is not null)
                {
                    throw new AggregateException($"Unable to create or clean up OPC UA subscription '{name}'.", exception, cleanupException);
                }
                throw;
            }

            var subscription = new OpcUaSubscription(sdkSubscription);
            _subscriptions.Add(name, subscription);
            return subscription;
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task CancelSubscriptionAsync(IOpcUaSubscription subscription, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        ArgumentNullException.ThrowIfNull(subscription);

        await _gate.WaitAsync(cancellationToken);
        try
        {
            Guard.ThrowIfDisposed(_disposed, this);
            var session = GetSession();
            if (_subscriptions.TryGetValue(subscription.Name, out var registered) && ReferenceEquals(registered, subscription))
            {
                await DeleteSubscriptionAsync(session, registered, cancellationToken);
            }
        }
        finally
        {
            _gate.Release();
        }
    }

    private static ApplicationConfiguration CreateConfiguration(OpcUaConnectionOptions options)
    {
        var pkiRoot = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "OPC Foundation",
            "CertificateStores");

        return new ApplicationConfiguration
        {
            ApplicationName = options.ApplicationName,
            ApplicationUri = $"urn:{Utils.GetHostName()}:{options.ApplicationName.Replace(' ', '-')}",
            ApplicationType = ApplicationType.Client,
            SecurityConfiguration = new SecurityConfiguration
            {
                ApplicationCertificate = new CertificateIdentifier
                {
                    StoreType = CertificateStoreType.Directory,
                    StorePath = Path.Combine(pkiRoot, "MachineDefault"),
                    SubjectName = $"CN={options.ApplicationName}"
                },
                TrustedIssuerCertificates = new CertificateTrustList
                {
                    StoreType = CertificateStoreType.Directory,
                    StorePath = Path.Combine(pkiRoot, "UA Certificate Authorities")
                },
                TrustedPeerCertificates = new CertificateTrustList
                {
                    StoreType = CertificateStoreType.Directory,
                    StorePath = Path.Combine(pkiRoot, "UA Applications")
                },
                RejectedCertificateStore = new CertificateTrustList
                {
                    StoreType = CertificateStoreType.Directory,
                    StorePath = Path.Combine(pkiRoot, "RejectedCertificates")
                }
            },
            TransportConfigurations = [],
            TransportQuotas = new TransportQuotas { OperationTimeout = options.OperationTimeout },
            ClientConfiguration = new ClientConfiguration { DefaultSessionTimeout = (int)options.SessionTimeout }
        };
    }

    private static void ValidateOptions(OpcUaConnectionOptions options)
    {
        Guard.ThrowIfNullOrWhiteSpace(options.ApplicationName, nameof(options.ApplicationName));
        Guard.ThrowIfNullOrWhiteSpace(options.SessionName, nameof(options.SessionName));
        if (options.OperationTimeout <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(options.OperationTimeout));
        }
        if (options.SessionTimeout == 0)
        {
            throw new ArgumentOutOfRangeException(nameof(options.SessionTimeout));
        }
        if (options.UseSecurity && options.Configuration is null)
        {
            throw new ArgumentException("A certificate-enabled application configuration is required for secure OPC UA endpoints.", nameof(options));
        }
    }

    private static NodeId ParseNodeId(string nodeId)
    {
        Guard.ThrowIfNullOrWhiteSpace(nodeId, nameof(nodeId));
        return NodeId.Parse(nodeId);
    }

    private ISession GetSession()
    {
        if (_session is not { Connected: true } session)
        {
            throw new InvalidOperationException("OPC UA Server is not connected.");
        }
        return session;
    }

    private async Task DeleteSubscriptionAsync(ISession session, OpcUaSubscription subscription, CancellationToken cancellationToken)
    {
        await subscription.Subscription.DeleteAsync(false, cancellationToken);
        try
        {
            await session.RemoveSubscriptionAsync(subscription.Subscription, cancellationToken);
        }
        finally
        {
            _subscriptions.Remove(subscription.Name);
            subscription.Dispose();
        }
    }

    private async Task DisconnectCoreAsync(CancellationToken cancellationToken)
    {
        foreach (var subscription in _subscriptions.Values)
        {
            subscription.Dispose();
        }
        _subscriptions.Clear();

        var session = _session;
        _session = null;
        EndpointUrl = null;
        if (session is not null)
        {
            try
            {
                if (session.Connected)
                {
                    await session.CloseAsync(cancellationToken);
                }
            }
            finally
            {
                session.Dispose();
            }
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed)
        {
            return;
        }

        await _gate.WaitAsync();
        try
        {
            if (_disposed)
            {
                return;
            }
            await DisconnectCoreAsync(CancellationToken.None);
            _disposed = true;
        }
        finally
        {
            _gate.Release();
        }
        GC.SuppressFinalize(this);
    }
}
