// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Configuration;
using Opc.Ua;
using Opc.Ua.Client;
using Opc.Ua.Configuration;

namespace UnitTestOpcUa;

public class UnitTest1
{
    [Fact]
    public async Task Connect_Ok()
    {
        var config = new ApplicationConfiguration()
        {
            ApplicationName = "KEPServerEX Client",
            ApplicationType = ApplicationType.Client,
            ApplicationUri = "urn:" + Utils.GetHostName() + ":KEPServerEXClient",
            SecurityConfiguration = new SecurityConfiguration
            {
                ApplicationCertificate = new CertificateIdentifier { StoreType = "X509Store", StorePath = "CurrentUser\\My" },
                TrustedPeerCertificates = new CertificateTrustList { StoreType = "Directory", StorePath = "OPC Foundation/CertificateStores/UA Applications" },
                RejectedCertificateStore = new CertificateTrustList { StoreType = "Directory", StorePath = "OPC Foundation/CertificateStores/RejectedCertificates" },
                AutoAcceptUntrustedCertificates = true // 仅用于测试环境
            },
            TransportConfigurations = new TransportConfigurationCollection(),
            TransportQuotas = new TransportQuotas { OperationTimeout = 15000 },
            ClientConfiguration = new ClientConfiguration { DefaultSessionTimeout = 60000 }
        };

        //await config.Validate(ApplicationType.Client);

        // 创建端点描述
        var endpointDescription = CoreClientUtils.SelectEndpoint("opc.tcp://127.0.0.1:49320", false);
        var endpointConfiguration = EndpointConfiguration.Create(config);
        var endpoint = new ConfiguredEndpoint(null, endpointDescription, endpointConfiguration);

        // 创建会话
        var identity = new UserIdentity(); // 匿名登录，或提供用户名密码
        var session = await Session.Create(
            config,
            endpoint,
            false,
            false,
            config.ApplicationName,
            60000,
            identity,
            null);
    }

    [Fact]
    public async Task FindServersAsync()
    {
        // 配置与连接过程同前述基本客户端
        var application = new ApplicationInstance
        {
            ApplicationName = "OPC UA Basic Client",
            ApplicationType = ApplicationType.Client
        };
        var applicationConfiguration = new ApplicationConfiguration
        {
            ApplicationName = application.ApplicationName,
            ApplicationType = application.ApplicationType,
            ClientConfiguration = new ClientConfiguration()
        };
        var endpointURL = "opc.tcp://127.0.0.1:49320";
        var endpointDescription = CoreClientUtils.SelectEndpoint(applicationConfiguration, endpointURL, false);
        var endpointConfiguration = EndpointConfiguration.Create();
        var endpoint = new ConfiguredEndpoint(null, endpointDescription, endpointConfiguration);

        var session = await Session.Create(
            configuration: applicationConfiguration,
            endpoint: endpoint,
            updateBeforeConnect: false,
            sessionName: "Opc.Session.BootstrapBlazor",
            sessionTimeout: 60000,
            identity: null,
            preferredLocales: null);
    }
}
