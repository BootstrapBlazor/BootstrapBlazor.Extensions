// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;

namespace BootstrapBlazor.OCR;

/// <summary>
/// 打印机类型
/// </summary>
public enum AiFormDocumentEmnuType
{
    [Description("prebuilt-read,从文档中提取文本")]
    Read,

    [Description("prebuilt-layout,从文档中提取文本和布局信息")]
    Layout,

    [Description("prebuilt-document,从文档中提取文本、布局、实体和通用键值对,Key-Value Pairs")]
    Document,

    [Description("prebuilt-businessCard,从名片中提取关键信息")]
    BusinessCard,

    [Description("prebuilt-idDocument,从护照和身份证中提取关键信息")]
    IdDocument,

    [Description("prebuilt-invoice,从发票中提取关键信息,Key-Value Pairs")]
    Invoice,

    [Description("prebuilt-receipt,从收据中提取关键信息")]
    Receipt,

    [Description("prebuilt-tax.us.w2,从 IRS US W2 税表（2018-2021 年）中提取关键信息")]
    Tax_us_w2,

    [Description("prebuilt-vaccinationCard,从美国 Covid-19 CDC 疫苗接种卡中提取关键信息")]
    VaccinationCard,

    [Description("prebuilt-healthInsuranceCard.us,从美国健康保险卡中提取关键信息")]
    HealthInsuranceCard_us,
}

