﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Reflection;

namespace BootstrapBlazor.DataConverters;

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
        var v = CreateEntity();
        var ret = Parse(data, v);
        entity = ret ? v : default;
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
            var unuseProperties = new List<PropertyInfo>(32);

            // 通过 SocketDataPropertyConverterAttribute 特性获取属性转换器
            var properties = entity.GetType().GetProperties().Where(p => p.CanWrite).ToList();
            foreach (var p in properties)
            {
                var attr = p.GetCustomAttribute<DataPropertyConverterAttribute>(false)
                    ?? GetPropertyConverterAttribute(p);
                if (attr != null)
                {
                    p.SetValue(entity, attr.ConvertTo(data));
                }
            }
            ret = true;
        }
        return ret;
    }

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
