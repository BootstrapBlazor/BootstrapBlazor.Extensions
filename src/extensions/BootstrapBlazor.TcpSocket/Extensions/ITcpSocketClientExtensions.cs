// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Reflection;
using System.Runtime.Versioning;
using System.Text;

namespace BootstrapBlazor.TcpSocket;

/// <summary>
/// <see cref="ITcpSocketClient"/> 扩展方法类
/// </summary>
[UnsupportedOSPlatform("browser")]
public static class ITcpSocketClientExtensions
{
    /// <summary>
    /// Sends the specified string content to the connected TCP socket client asynchronously.
    /// </summary>
    /// <remarks>This method converts the provided string content into a byte array using the specified
    /// encoding  (or UTF-8 by default) and sends it to the connected TCP socket client. Ensure the client is connected
    /// before calling this method.</remarks>
    /// <param name="client">The TCP socket client to which the content will be sent. Cannot be <see langword="null"/>.</param>
    /// <param name="content">The string content to send. Cannot be <see langword="null"/> or empty.</param>
    /// <param name="encoding">The character encoding to use for converting the string content to bytes.  If <see langword="null"/>, UTF-8
    /// encoding is used by default.</param>
    /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the operation to complete.</param>
    /// <returns>A <see cref="ValueTask{TResult}"/> that represents the asynchronous operation.  The result is <see
    /// langword="true"/> if the content was sent successfully; otherwise, <see langword="false"/>.</returns>
    public static ValueTask<bool> SendAsync(this ITcpSocketClient client, string content, Encoding? encoding = null, CancellationToken token = default)
    {
        var buffer = encoding?.GetBytes(content) ?? Encoding.UTF8.GetBytes(content);
        return client.SendAsync(buffer, token);
    }

    /// <summary>
    /// Establishes an asynchronous connection to the specified host and port.
    /// </summary>
    /// <param name="client">The TCP socket client to which the content will be sent. Cannot be <see langword="null"/>.</param>
    /// <param name="ipString">The hostname or IP address of the server to connect to. Cannot be null or empty.</param>
    /// <param name="port">The port number on the server to connect to. Must be a valid port number between 0 and 65535.</param>
    /// <param name="token">An optional <see cref="CancellationToken"/> to cancel the connection attempt. Defaults to <see
    /// langword="default"/> if not provided.</param>
    /// <returns>A task that represents the asynchronous operation. The task result is <see langword="true"/> if the connection
    /// is successfully established; otherwise, <see langword="false"/>.</returns>
    public static ValueTask<bool> ConnectAsync(this ITcpSocketClient client, string ipString, int port, CancellationToken token = default)
    {
        var endPoint = TcpSocketUtility.ConvertToIpEndPoint(ipString, port);
        return client.ConnectAsync(endPoint, token);
    }

    private static readonly Dictionary<ITcpSocketClient, List<(IDataPackageAdapter Adapter, Func<ReadOnlyMemory<byte>, ValueTask> Callback)>> Cache = [];

    /// <summary>
    /// 增加 <see cref="ITcpSocketClient"/> 数据适配器及其对应的回调方法
    /// </summary>
    /// <param name="client"></param>
    /// <param name="adapter"></param>
    /// <param name="callback"></param>
    public static void AddDataPackageAdapter(this ITcpSocketClient client, IDataPackageAdapter adapter, Func<ReadOnlyMemory<byte>, ValueTask> callback)
    {
        async ValueTask ReceivedCallback(ReadOnlyMemory<byte> buffer)
        {
            // 将接收到的数据传递给 DataPackageAdapter 进行数据处理合规数据触发 ReceivedCallBack 回调
            await adapter.HandlerAsync(buffer);
        }

        if (Cache.TryGetValue(client, out var list))
        {
            list.Add((adapter, ReceivedCallback));
        }
        else
        {
            Cache.Add(client, [(adapter, ReceivedCallback)]);
        }

        client.ReceivedCallback += ReceivedCallback;

        // 设置 DataPackageAdapter 的回调函数
        adapter.ReceivedCallBack = callback;
    }

    /// <summary>
    /// 移除 <see cref="ITcpSocketClient"/> 数据适配器及其对应的回调方法
    /// </summary>
    /// <param name="client"></param>
    /// <param name="callback"></param>
    public static void RemoveDataPackageAdapter(this ITcpSocketClient client, Func<ReadOnlyMemory<byte>, ValueTask> callback)
    {
        if (Cache.TryGetValue(client, out var list))
        {
            var items = list.Where(i => i.Adapter.ReceivedCallBack == callback).ToList();
            foreach (var c in items)
            {
                client.ReceivedCallback -= c.Callback;
                list.Remove(c);
            }
        }
    }

    /// <summary>
    /// 通过指定 <see cref="IDataPackageHandler"/> 数据处理实例，设置数据适配器并配置回调方法，切记使用 <see cref="RemoveDataPackageAdapter(ITcpSocketClient, Func{ReadOnlyMemory{byte}, ValueTask})"/> 移除数据处理委托防止内存泄露
    /// </summary>
    /// <param name="client"><see cref="ITcpSocketClient"/> 实例</param>
    /// <param name="handler"><see cref="IDataPackageHandler"/> 数据处理实例</param>
    /// <param name="callback">回调方法</param>
    public static void AddDataPackageAdapter(this ITcpSocketClient client, IDataPackageHandler handler, Func<ReadOnlyMemory<byte>, ValueTask> callback)
    {
        client.AddDataPackageAdapter(new DataPackageAdapter(handler), callback);
    }

    private static readonly Dictionary<ITcpSocketClient, List<(Func<ReadOnlyMemory<byte>, ValueTask> ReceivedCallback, Delegate EntityCallback)>> EntityCache = [];

    /// <summary>
    /// Configures the specified <see cref="ITcpSocketClient"/> to use a data package adapter and a callback function
    /// for processing received data. 切记使用 <see cref="RemoveDataPackageAdapter(ITcpSocketClient, Func{ReadOnlyMemory{byte}, ValueTask})"/> 移除数据处理委托防止内存泄露
    /// </summary>
    /// <remarks>This method sets up the <paramref name="client"/> to process incoming data using the
    /// specified <paramref name="adapter"/> and  <paramref name="socketDataConverter"/>. The <paramref
    /// name="callback"/> is called with the converted entity whenever data is received.</remarks>
    /// <typeparam name="TEntity">The type of the entity that the data will be converted to.</typeparam>
    /// <param name="client">The TCP socket client to configure.</param>
    /// <param name="adapter">The data package adapter responsible for handling incoming data.</param>
    /// <param name="socketDataConverter">The converter used to transform the received data into the specified entity type.</param>
    /// <param name="callback">The callback function to be invoked with the converted entity.</param>
    public static void AddDataPackageAdapter<TEntity>(this ITcpSocketClient client, IDataPackageAdapter adapter, IDataConverter<TEntity> socketDataConverter, Func<TEntity?, Task> callback)
    {
        async ValueTask ReceivedCallback(ReadOnlyMemory<byte> buffer)
        {
            // 将接收到的数据传递给 DataPackageAdapter 进行数据处理合规数据触发 ReceivedCallBack 回调
            await adapter.HandlerAsync(buffer);
        }

        if (EntityCache.TryGetValue(client, out var list))
        {
            list.Add((ReceivedCallback, callback));
        }
        else
        {
            EntityCache.Add(client, [(ReceivedCallback, callback)]);
        }

        client.ReceivedCallback += ReceivedCallback;

        // 设置 DataPackageAdapter 的回调函数
        adapter.ReceivedCallBack = async buffer =>
        {
            TEntity? ret = default;
            if (socketDataConverter.TryConvertTo(buffer, out var t))
            {
                ret = t;
            }
            await callback(ret);
        };
    }

    /// <summary>
    /// 移除 <see cref="ITcpSocketClient"/> 数据适配器及其对应的回调方法
    /// </summary>
    /// <param name="client"></param>
    /// <param name="callback"></param>
    public static void RemoveDataPackageAdapter<TEntity>(this ITcpSocketClient client, Func<TEntity?, Task> callback)
    {
        if (EntityCache.TryGetValue(client, out var list))
        {
            var items = list.Where(i => i.EntityCallback.Equals(callback)).ToList();
            foreach (var c in items)
            {
                client.ReceivedCallback -= c.ReceivedCallback;
                list.Remove(c);
            }
        }
    }

    /// <summary>
    /// 通过指定 <see cref="IDataPackageHandler"/> 数据处理实例，设置数据适配器并配置回调方法。切记使用 <see cref="RemoveDataPackageAdapter"/> 移除数据处理委托防止内存泄露
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <param name="client"></param>
    /// <param name="handler"></param>
    /// <param name="socketDataConverter"></param>
    /// <param name="callback"></param>
    public static void AddDataPackageAdapter<TEntity>(this ITcpSocketClient client, IDataPackageHandler handler, IDataConverter<TEntity> socketDataConverter, Func<TEntity?, Task> callback)
    {
        client.AddDataPackageAdapter(new DataPackageAdapter(handler), socketDataConverter, callback);
    }

    /// <summary>
    /// Configures the specified <see cref="ITcpSocketClient"/> to use a custom data package adapter and callback
    /// function. 切记使用 <see cref="RemoveDataPackageAdapter"/> 移除数据处理委托防止内存泄露
    /// </summary>
    /// <remarks>This method sets up the <paramref name="client"/> to use the specified <paramref
    /// name="adapter"/> for handling incoming data. If the <typeparamref name="TEntity"/> type is decorated with a <see
    /// cref="DataTypeConverterAttribute"/>, the associated converter is used to transform the data before invoking
    /// the <paramref name="callback"/>. The callback is called with the converted entity or <see langword="null"/> if
    /// conversion fails.</remarks>
    /// <typeparam name="TEntity">The type of entity that the data package adapter will handle.</typeparam>
    /// <param name="client">The TCP socket client to configure.</param>
    /// <param name="adapter">The data package adapter responsible for processing incoming data.</param>
    /// <param name="callback">The callback function to invoke with the processed entity of type <typeparamref name="TEntity"/>.</param>
    public static void AddDataPackageAdapter<TEntity>(this ITcpSocketClient client, IDataPackageAdapter adapter, Func<TEntity?, Task> callback)
    {
        async ValueTask ReceivedCallback(ReadOnlyMemory<byte> buffer)
        {
            // 将接收到的数据传递给 DataPackageAdapter 进行数据处理合规数据触发 ReceivedCallBack 回调
            await adapter.HandlerAsync(buffer);
        }

        if (EntityCache.TryGetValue(client, out var list))
        {
            list.Add((ReceivedCallback, callback));
        }
        else
        {
            EntityCache.Add(client, [(ReceivedCallback, callback)]);
        }

        client.ReceivedCallback += ReceivedCallback;

        IDataConverter<TEntity>? converter = null;

        var type = typeof(TEntity);
        var converterType = type.GetCustomAttribute<DataTypeConverterAttribute>();

        // 如果类型上有 SocketDataTypeConverterAttribute 特性则使用特性中指定的转换器
        // 如果没有特性则从 ITcpSocketClient 中的服务容器获取转换器
        converter = converterType is { Type: not null }
            ? converterType.Type.CreateInstance<IDataConverter<TEntity>>()
            : client.GetSocketDataConverter<TEntity>();

        if (converter == null)
        {
            // 未设置数据转换器返回 default 值
            adapter.ReceivedCallBack = async buffer => await callback(default);
        }
        else
        {
            // 设置转化器
            adapter.ReceivedCallBack = async buffer =>
            {
                TEntity? ret = default;
                if (converter.TryConvertTo(buffer, out var t))
                {
                    ret = t;
                }
                await callback(ret);
            };
        }
    }

    /// <summary>
    /// 通过指定 <see cref="IDataPackageHandler"/> 数据处理实例，设置数据适配器并配置回调方法。切记使用 <see cref="RemoveDataPackageAdapter"/> 移除数据处理委托防止内存泄露
    /// </summary>
    /// <param name="client"><see cref="ITcpSocketClient"/> 实例</param>
    /// <param name="handler"><see cref="IDataPackageHandler"/> 数据处理实例</param>
    /// <param name="callback">回调方法</param>
    public static void AddDataPackageAdapter<TEntity>(this ITcpSocketClient client, IDataPackageHandler handler, Func<TEntity?, Task> callback)
    {
        client.AddDataPackageAdapter(new DataPackageAdapter(handler), callback);
    }

    private static IDataConverter<TEntity>? GetSocketDataConverter<TEntity>(this ITcpSocketClient client)
    {
        IDataConverter<TEntity>? converter = null;
        if (client is IServiceProvider provider)
        {
            var converters = provider.GetRequiredService<IOptions<DataConverterCollections>>().Value;
            if (converters.TryGetTypeConverter<TEntity>(out var v))
            {
                converter = v;
            }
        }
        return converter;
    }
}
