// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components.MindMaps;

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

    [Description("默认")]
    defaultTheme,

    [Description("经典")]
    classic,

    [Description("经典2")]
    classic2,

    [Description("经典3")]
    classic3,

    [Description("经典4")]
    classic4,

    [Description("经典绿")]
    classicGreen,

    [Description("经典蓝")]
    classicBlue,

    [Description("黑色")]
    dark,

    [Description("黑色2")]
    dark2,

    [Description("简洁黑")]
    simpleBlack,

    [Description("黑色幽默")]
    blackHumour,

    [Description("深夜")]
    lateNightOffice,

    [Description("黑金")]
    blackGold,

    [Description("咖啡")]
    coffee,

    [Description("清新绿")]
    freshGreen,

    [Description("绿叶")]
    greenLeaf,

    [Description("天绿")]
    skyGreen,

    [Description("薄荷")]
    mint,

    [Description("牛油果")]
    avocado,

    [Description("天蓝")]
    blueSky,

    [Description("葡萄粉")]
    pinkGrape,

    [Description("粉色")]
    brainImpairedPink,

    [Description("浪漫紫")]
    romanticPurple,

    [Description("鲜红")]
    freshRed,

    [Description("激情红")]
    redSpirit,

    [Description("橙汁")]
    orangeJuice,

    [Description("金黄")]
    gold,

    [Description("土黄")]
    earthYellow,

    [Description("大眼萌")]
    minions,

    [Description("活力橙")]
    vitalityOrange,

    [Description("秋天")]
    autumn,

    [Description("墨绿")]
    courseGreen,
}
