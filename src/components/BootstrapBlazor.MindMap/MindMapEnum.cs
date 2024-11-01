// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 布局
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumMindMapLayout
{
    /// <summary>
    /// 逻辑结构图
    /// </summary>
    [Description("逻辑结构图")]
    logicalStructure,

    /// <summary>
    /// 思维导图
    /// </summary>
    [Description("思维导图")]
    mindMap,

    /// <summary>
    /// 组织结构图
    /// </summary>
    [Description("组织结构图")]
    organizationStructure,

    /// <summary>
    /// 目录组织图
    /// </summary>
    [Description("目录组织图")]
    catalogOrganization,

    /// <summary>
    /// 时间轴
    /// </summary>
    [Description("时间轴")]
    timeline,

    /// <summary>
    /// 时间轴2
    /// </summary>
    [Description("时间轴2")]
    timeline2,

    /// <summary>
    /// 鱼骨图
    /// </summary>
    [Description("鱼骨图")]
    fishbone,

    /// <summary>
    /// 竖向时间轴
    /// </summary>
    [Description("竖向时间轴")]
    verticalTimeline
}

/// <summary>
/// 主题
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumMindMapTheme
{
    /// <summary>
    /// 
    /// </summary>
    [Description("默认")]
    defaultTheme,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典")]
    classic,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典2")]
    classic2,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典3")]
    classic3,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典4")]
    classic4,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典绿")]
    classicGreen,

    /// <summary>
    /// 
    /// </summary>
    [Description("经典蓝")]
    classicBlue,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑色")]
    dark,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑色2")]
    dark2,

    /// <summary>
    /// 
    /// </summary>
    [Description("简洁黑")]
    simpleBlack,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑色幽默")]
    blackHumour,

    /// <summary>
    /// 
    /// </summary>
    [Description("深夜")]
    lateNightOffice,

    /// <summary>
    /// 
    /// </summary>
    [Description("黑金")]
    blackGold,

    /// <summary>
    /// 
    /// </summary>
    [Description("咖啡")]
    coffee,

    /// <summary>
    /// 
    /// </summary>
    [Description("清新绿")]
    freshGreen,

    /// <summary>
    /// 
    /// </summary>
    [Description("绿叶")]
    greenLeaf,

    /// <summary>
    /// 
    /// </summary>
    [Description("天绿")]
    skyGreen,

    /// <summary>
    /// 
    /// </summary>
    [Description("薄荷")]
    mint,

    /// <summary>
    /// 
    /// </summary>
    [Description("牛油果")]
    avocado,

    /// <summary>
    /// 
    /// </summary>
    [Description("天蓝")]
    blueSky,

    /// <summary>
    /// 
    /// </summary>
    [Description("葡萄粉")]
    pinkGrape,

    /// <summary>
    /// 
    /// </summary>
    [Description("粉色")]
    brainImpairedPink,

    /// <summary>
    /// 
    /// </summary>
    [Description("浪漫紫")]
    romanticPurple,

    /// <summary>
    /// 
    /// </summary>
    [Description("鲜红")]
    freshRed,

    /// <summary>
    /// 
    /// </summary>
    [Description("激情红")]
    redSpirit,

    /// <summary>
    /// 
    /// </summary>
    [Description("橙汁")]
    orangeJuice,

    /// <summary>
    /// 
    /// </summary>
    [Description("金黄")]
    gold,

    /// <summary>
    /// 
    /// </summary>
    [Description("土黄")]
    earthYellow,

    /// <summary>
    /// 
    /// </summary>
    [Description("大眼萌")]
    minions,

    /// <summary>
    /// 
    /// </summary>
    [Description("活力橙")]
    vitalityOrange,

    /// <summary>
    /// 
    /// </summary>
    [Description("秋天")]
    autumn,

    /// <summary>
    /// 
    /// </summary>
    [Description("墨绿")]
    courseGreen,
}
