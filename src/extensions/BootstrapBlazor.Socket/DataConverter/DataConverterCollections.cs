// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Collections.Concurrent;
using System.Linq.Expressions;
using System.Reflection;

namespace BootstrapBlazor.DataConverters;

/// <summary>
/// 数据转换器集合类
/// </summary>
public sealed class DataConverterCollections
{
    readonly ConcurrentDictionary<Type, IDataConverter> _converters = new();
    readonly ConcurrentDictionary<MemberInfo, DataPropertyConverterAttribute> _propertyConverters = new();

    /// <summary>
    /// 增加指定 <see cref="IDataConverter{TEntity}"/> 数据类型转换器方法
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <param name="converter"></param>
    public void AddTypeConverter<TEntity>(IDataConverter<TEntity> converter)
    {
        var type = typeof(TEntity);
        _converters.AddOrUpdate(type, t => converter, (t, v) => converter);
    }

    /// <summary>
    /// 增加默认数据类型转换器方法 转换器使用 <see cref="DataConverter{TEntity}"/>
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public void AddTypeConverter<TEntity>() => AddTypeConverter(new DataConverter<TEntity>(this));

    /// <summary>
    /// 添加属性类型转化器方法
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <param name="propertyExpression"></param>
    /// <param name="attribute"></param>
    public void AddPropertyConverter<TEntity>(Expression<Func<TEntity, object?>> propertyExpression, DataPropertyConverterAttribute attribute)
    {
        if (propertyExpression.Body is MemberExpression memberExpression)
        {
            if (attribute.Type == null)
            {
                attribute.Type = memberExpression.Type;
            }
            _propertyConverters.AddOrUpdate(memberExpression.Member, m => attribute, (m, v) => attribute);
        }
    }

    /// <summary>
    /// 获得指定数据类型转换器方法
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public bool TryGetTypeConverter<TEntity>([NotNullWhen(true)] out IDataConverter<TEntity>? converter)
    {
        converter = null;
        var ret = false;
        if (_converters.TryGetValue(typeof(TEntity), out var v) && v is IDataConverter<TEntity> c)
        {
            converter = c;
            ret = true;
        }
        return ret;
    }

    /// <summary>
    /// 获得指定数据类型属性转换器方法
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public bool TryGetPropertyConverter<TEntity>(Expression<Func<TEntity, object?>> propertyExpression, [NotNullWhen(true)] out DataPropertyConverterAttribute? converterAttribute)
    {
        converterAttribute = null;
        var ret = false;
        if (propertyExpression.Body is MemberExpression memberExpression && TryGetPropertyConverter<TEntity>(memberExpression.Member, out var v))
        {
            converterAttribute = v;
            ret = true;
        }
        return ret;
    }

    /// <summary>
    /// 获得指定数据类型属性转换器方法
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public bool TryGetPropertyConverter<TEntity>(MemberInfo memberInfo, [NotNullWhen(true)] out DataPropertyConverterAttribute? converterAttribute)
    {
        converterAttribute = null;
        var ret = false;
        if (_propertyConverters.TryGetValue(memberInfo, out var v))
        {
            converterAttribute = v;
            ret = true;
        }
        return ret;
    }
}
