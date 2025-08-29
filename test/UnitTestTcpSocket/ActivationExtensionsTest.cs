// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace UnitTestTcpSocket;

public class ActivationExtensionsTest
{
    [Fact]
    public void Activation_Ok()
    {
        var type = typeof(Foo);
        var o = type.CreateInstance();
        Assert.NotNull(o);

        var foo = o as Foo;
        Assert.NotNull(foo);

        var foo1 = type.CreateInstance<Foo>();
        Assert.NotNull(foo1);
    }

    [Fact]
    public void Activation_Nest()
    {
        var o = typeof(MockNestEntity).CreateInstance<MockNestEntity>([0.01f]);
        Assert.Equal(0.01f, o?.Rate);
    }

    [Fact]
    public void Activation_Fail()
    {
        var type = typeof(string);
        var o = type.CreateInstance([123]);
        Assert.Null(o);

        var foo = type.CreateInstance<Foo>();
        Assert.Null(foo);
    }

    class MockNestEntity(float rate)
    {
        public float Rate { get; } = rate;
    }
}
