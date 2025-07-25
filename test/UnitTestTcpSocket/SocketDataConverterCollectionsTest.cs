﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace UnitTestTcpSocket;

public class SocketDataConverterCollectionsTest
{
    [Fact]
    public void TryGetConverter_Ok()
    {
        var sc = new ServiceCollection();
        sc.ConfigureDataConverters(options =>
        {
            options.AddTypeConverter<MockEntity>();
            options.AddPropertyConverter<MockEntity>(entity => entity.Header, new DataPropertyConverterAttribute()
            {
                Offset = 0,
                Length = 5
            });
            options.AddPropertyConverter<MockEntity>(entity => entity.Body, new DataPropertyConverterAttribute()
            {
                Offset = 5,
                Length = 2
            });

            // 为提高代码覆盖率 重复添加转换器以后面的为准
            options.AddTypeConverter<MockEntity>();
            options.AddPropertyConverter<MockEntity>(entity => entity.Header, new DataPropertyConverterAttribute()
            {
                Offset = 0,
                Length = 5
            });
        });

        var provider = sc.BuildServiceProvider();
        var service = provider.GetRequiredService<IOptions<DataConverterCollections>>();
        Assert.NotNull(service.Value);

        var ret = service.Value.TryGetTypeConverter<MockEntity>(out var converter);
        Assert.True(ret);
        Assert.NotNull(converter);

        var fakeConverter = service.Value.TryGetTypeConverter<Foo>(out var fooConverter);
        Assert.False(fakeConverter);
        Assert.Null(fooConverter);

        ret = service.Value.TryGetPropertyConverter<MockEntity>(entity => entity.Header, out var propertyConverterAttribute);
        Assert.True(ret);
        Assert.NotNull(propertyConverterAttribute);
        Assert.True(propertyConverterAttribute is { Offset: 0, Length: 5 });

        ret = service.Value.TryGetPropertyConverter<Foo>(entity => entity.Name, out var fooPropertyConverterAttribute);
        Assert.False(ret);
        Assert.Null(fooPropertyConverterAttribute);

        ret = service.Value.TryGetPropertyConverter<MockEntity>(entity => entity.ToString(), out _);
        Assert.False(ret);
    }

    class MockEntity
    {
        public byte[]? Header { get; set; }

        public byte[]? Body { get; set; }
    }

    class MockLoggerProvider : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new MockLogger();
        }

        public void Dispose()
        {

        }
    }

    class MockLogger : ILogger
    {
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {

        }
    }
}
