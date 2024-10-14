// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 条码类型
/// </summary>
public enum EnumBarcodeFormat
{
    /// <summary>
    /// 
    /// </summary>
    CODE128,
    /// <summary>
    /// 
    /// </summary>
    CODE128A,
    /// <summary>
    /// 
    /// </summary>
    CODE128B,
    /// <summary>
    /// 
    /// </summary>
    CODE128C,
    /// <summary>
    /// 
    /// </summary>
    EAN13,
    /// <summary>
    /// 
    /// </summary>
    EAN8,
    /// <summary>
    /// 
    /// </summary>
    EAN5,
    /// <summary>
    /// 
    /// </summary>
    EAN2,
    /// <summary>
    /// 
    /// </summary>
    UPC,
    /// <summary>
    /// 
    /// </summary>
    CODE39,
    /// <summary>
    /// 
    /// </summary>
    ITF14,
    /// <summary>
    /// 
    /// </summary>
    ITF,
    /// <summary>
    /// 
    /// </summary>
    MSI,
    /// <summary>
    /// 
    /// </summary>
    MSI10,
    /// <summary>
    /// 
    /// </summary>
    MSI11,
    /// <summary>
    /// 
    /// </summary>
    MSI1010,
    /// <summary>
    /// 
    /// </summary>
    MSI1110,
    /// <summary>
    /// 
    /// </summary>
    [Description("pharmacode")]
    Pharmacode
}
