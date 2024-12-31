// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 布局
/// </summary>
[JsonEnumConverter(true)]
public enum EnumMindMapLayout
{
    /// <summary>
    /// 逻辑结构图
    /// </summary>
    [Description("逻辑结构图")]
    LogicalStructure,

    /// <summary>
    /// 思维导图
    /// </summary>
    [Description("思维导图")]
    MindMap,

    /// <summary>
    /// 组织结构图
    /// </summary>
    [Description("组织结构图")]
    OrganizationStructure,

    /// <summary>
    /// 目录组织图
    /// </summary>
    [Description("目录组织图")]
    CatalogOrganization,

    /// <summary>
    /// 时间轴
    /// </summary>
    [Description("时间轴")]
    Timeline,

    /// <summary>
    /// 时间轴2
    /// </summary>
    [Description("时间轴2")]
    Timeline2,

    /// <summary>
    /// 鱼骨图
    /// </summary>
    [Description("鱼骨图")]
    Fishbone,

    /// <summary>
    /// 竖向时间轴
    /// </summary>
    [Description("竖向时间轴")]
    VerticalTimeline
}

/// <summary>
/// 主题
/// </summary>
[JsonEnumConverter(true)]
public enum EnumMindMapTheme
{
    /// <summary>
    /// 
    /// </summary>
    [Description("默认")]
    DefaultTheme,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典")]
    Classic,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典2")]
    Classic2,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典3")]
    Classic3,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典4")]
    Classic4,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典绿")]
    ClassicGreen,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典蓝")]
    ClassicBlue,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑色")]
    Dark,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑色2")]
    Dark2,

    /// <summary>
    /// 
    /// </summary>
    [Description("简洁黑")]
    SimpleBlack,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑色幽默")]
    BlackHumour,

    /// <summary>
    /// 
    /// </summary>
    [Description("深夜")]
    LateNightOffice,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑金")]
    BlackGold,

    /// <summary>
    /// 
    /// </summary>
    [Description("咖啡")]
    Coffee,

    /// <summary>
    /// 
    /// </summary>
    [Description("清新绿")]
    FreshGreen,

    /// <summary>
    /// 
    /// </summary>
    [Description("绿叶")]
    GreenLeaf,

    /// <summary>
    /// 
    /// </summary>
    [Description("天绿")]
    SkyGreen,

    /// <summary>
    /// 
    /// </summary>
    [Description("薄荷")]
    Mint,

    /// <summary>
    /// 
    /// </summary>
    [Description("牛油果")]
    Avocado,

    /// <summary>
    /// 
    /// </summary>
    [Description("天蓝")]
    BlueSky,

    /// <summary>
    /// 
    /// </summary>
    [Description("葡萄粉")]
    PinkGrape,

    /// <summary>
    /// 
    /// </summary>
    [Description("粉色")]
    BrainImpairedPink,

    /// <summary>
    /// 
    /// </summary>
    [Description("浪漫紫")]
    RomanticPurple,

    /// <summary>
    /// 
    /// </summary>
    [Description("鲜红")]
    FreshRed,

    /// <summary>
    /// 
    /// </summary>
    [Description("激情红")]
    RedSpirit,

    /// <summary>
    /// 
    /// </summary>
    [Description("橙汁")]
    OrangeJuice,

    /// <summary>
    /// 
    /// </summary>
    [Description("金黄")]
    Gold,

    /// <summary>
    /// 
    /// </summary>
    [Description("土黄")]
    EarthYellow,

    /// <summary>
    /// 
    /// </summary>
    [Description("大眼萌")]
    Minions,

    /// <summary>
    /// 
    /// </summary>
    [Description("活力橙")]
    VitalityOrange,

    /// <summary>
    /// 
    /// </summary>
    [Description("秋天")]
    Autumn,

    /// <summary>
    /// 
    /// </summary>
    [Description("墨绿")]
    CourseGreen,
}
