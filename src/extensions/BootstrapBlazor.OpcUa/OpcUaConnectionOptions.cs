// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 连接配置</para>
/// <para lang="en">OPC UA connection options</para>
/// </summary>
public sealed class OpcUaConnectionOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 应用名称</para>
    /// <para lang="en">Gets or sets the application name</para>
    /// </summary>
    public string ApplicationName { get; set; } = "BootstrapBlazor OpcUa Client";

    /// <summary>
    /// <para lang="zh">获得/设置 会话名称</para>
    /// <para lang="en">Gets or sets the session name</para>
    /// </summary>
    public string SessionName { get; set; } = "BootstrapBlazor.OpcUa";

    /// <summary>
    /// <para lang="zh">获得/设置 会话超时时间，单位毫秒</para>
    /// <para lang="en">Gets or sets the session timeout in milliseconds</para>
    /// </summary>
    public uint SessionTimeout { get; set; } = 60000;

    /// <summary>
    /// <para lang="zh">获得/设置 操作超时时间，单位毫秒</para>
    /// <para lang="en">Gets or sets the operation timeout in milliseconds</para>
    /// </summary>
    public int OperationTimeout { get; set; } = 15000;

    /// <summary>
    /// <para lang="zh">获得/设置 是否选择安全端点</para>
    /// <para lang="en">Gets or sets whether to select a secure endpoint</para>
    /// </summary>
    public bool UseSecurity { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 用户身份，默认使用匿名身份</para>
    /// <para lang="en">Gets or sets the user identity; anonymous identity is used by default</para>
    /// </summary>
    public IUserIdentity? Identity { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 首选区域</para>
    /// <para lang="en">Gets or sets the preferred locales</para>
    /// </summary>
    public IList<string>? PreferredLocales { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 应用配置，安全连接应提供包含证书配置的实例</para>
    /// <para lang="en">Gets or sets the application configuration; secure connections should provide certificate settings</para>
    /// </summary>
    public ApplicationConfiguration? Configuration { get; set; }
}
