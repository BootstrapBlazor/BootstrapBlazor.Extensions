// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Socket.Logging;
using System.Diagnostics;
using System.Reflection;

namespace BootstrapBlazor.Socket.DataConverters;

/// <summary>
/// Provides a base class for converting socket data into a specified entity type.
/// </summary>
/// <typeparam name="TEntity">The type of entity to convert the socket data into.</typeparam>
public class DataConverter<TEntity>(DataConverterCollections converters) : IDataConverter<TEntity>
{
    /// <summary>
    /// 构造函数
    /// </summary>
    public DataConverter() : this(new())
    {
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    /// <param name="entity"></param>
    /// <returns></returns>
    public virtual bool TryConvertTo(ReadOnlyMemory<byte> data, [NotNullWhen(true)] out TEntity? entity)
    {
        var ret = false;
        entity = default;
        try
        {
            var v = CreateEntity();
            if (Parse(data, v))
            {
                entity = v;
                ret = true;
            }
        }
        catch (Exception ex)
        {
            SocketLogging.LogError(ex, $"DataConverter {nameof(TryConvertTo)} failed");
        }
        return ret;
    }

    /// <summary>
    /// 创建实体实例方法
    /// </summary>
    /// <returns></returns>
    protected virtual TEntity CreateEntity() => Activator.CreateInstance<TEntity>();

    /// <summary>
    /// 将字节数据转换为指定实体类型的实例。
    /// </summary>
    /// <param name="data"></param>
    /// <param name="entity"></param>
    protected virtual bool Parse(ReadOnlyMemory<byte> data, TEntity entity)
    {
        // 使用 SocketDataPropertyAttribute 特性获取数据转换规则
        var ret = false;
        if (entity != null)
        {
            // 通过 SocketDataPropertyConverterAttribute 特性获取属性转换器
            var debug = System.Diagnostics.Debugger.IsAttached;
            var properties = entity.GetType().GetProperties().Where(p => p.CanWrite).ToList();
            if (Debugger.IsAttached)
            {
                SocketLogging.LogDebug($"Data: {BitConverter.ToString(data.ToArray())}");
            }
            foreach (var p in properties)
            {
                var attr = p.GetCustomAttribute<DataPropertyConverterAttribute>(false) ?? GetPropertyConverterAttribute(p);
                if (attr is { Type: not null })
                {
                    var value = attr.ConvertTo(data);
                    var valueType = value?.GetType();
                    if (p.PropertyType.IsAssignableFrom(valueType))
                    {
                        p.SetValue(entity, value);
                    }
                    else
                    {
                        SocketLogging.LogInformation($"{nameof(Parse)} failed. Start: {attr.Offset}. Length: {attr.Length}. Can't convert value from {GetValueType(valueType)} to {p.Name}({p.PropertyType})");
                    }
                }
            }
            ret = true;
        }
        return ret;
    }

    private static string GetValueType(Type? type) => type?.FullName ?? "NULL";

    private DataPropertyConverterAttribute? GetPropertyConverterAttribute(PropertyInfo propertyInfo)
    {
        DataPropertyConverterAttribute? attr = null;
        if (converters.TryGetPropertyConverter<TEntity>(propertyInfo, out var v))
        {
            attr = v;
        }
        return attr;
    }
}
