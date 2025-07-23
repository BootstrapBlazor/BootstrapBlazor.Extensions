// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.DataConverters;

/// <summary>
/// Socket 数据转换器接口
/// </summary>
public interface IDataConverter
{

}

/// <summary>
/// Defines a method to convert raw socket data into a specified entity type.
/// </summary>
/// <typeparam name="TEntity">The type of entity to convert the data into.</typeparam>
public interface IDataConverter<TEntity> : IDataConverter
{
    /// <summary>
    /// Attempts to convert the specified data to an instance of <typeparamref name="TEntity"/>.
    /// </summary>
    /// <remarks>This method does not throw an exception if the conversion fails. Instead, it returns <see
    /// langword="false"/> and sets <paramref name="entity"/> to <see langword="null"/>.</remarks>
    /// <param name="data">The data to be converted, represented as a read-only memory block of bytes.</param>
    /// <param name="entity">When this method returns, contains the converted <typeparamref name="TEntity"/> if the conversion succeeded;
    /// otherwise, <see langword="null"/>.</param>
    /// <returns><see langword="true"/> if the conversion was successful; otherwise, <see langword="false"/>.</returns>
    bool TryConvertTo(ReadOnlyMemory<byte> data, [NotNullWhen(true)] out TEntity? entity);
}
