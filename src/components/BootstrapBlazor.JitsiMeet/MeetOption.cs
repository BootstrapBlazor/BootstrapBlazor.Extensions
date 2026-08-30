// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// IFrame 参数类
/// </summary>
public class MeetOption
{
    /// <summary>
    /// 要加入的房间名称
    /// </summary>
    public string? RoomName { get; set; }

    /// <summary>
    /// 创建的 IFrame 宽度，可以是数值（像素单位）或字符串（格式：数字 + px、em、pt 或 %）
    /// </summary>
    public object? Width { get; set; }

    /// <summary>
    /// 创建的 IFrame 高度，可以是数值（像素单位）或字符串（格式：数字 + px、em、pt 或 %）
    /// </summary>
    public object? Height { get; set; }

    /// <summary>
    /// config.js 文件中选项的重写配置
    /// </summary>
    public object? ConfigOverwrite { get; set; }

    /// <summary>
    /// interface_config.js 文件中选项的重写配置
    /// </summary>
    public object? InterfaceConfigOverwrite { get; set; }

    /// <summary>
    /// JWT token
    /// </summary>
    public string? Jwt { get; set; }

    /// <summary>
    /// 邀请参加会议的参与者信息数组
    /// </summary>
    public object? Invitees { get; set; }

    /// <summary>
    /// 会议中使用的设备信息映射
    /// </summary>
    public object? Devices { get; set; }

    /// <summary>
    /// 参与者启动或加入会议的信息（例如，电子邮件）
    /// </summary>
    public UserInfo? UserInfo { get; set; }

    /// <summary>
    /// 默认会议语言(默认为中文)
    /// </summary>
    public string Lang { get; set; } = "zh";
}

/// <summary>
/// 参会人员信息
/// </summary>
public class UserInfo
{
    /// <summary>
    /// 参与者的电子邮件地址
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// 参与者的名称
    /// </summary>
    public string? DisplayName { get; set; }
}

