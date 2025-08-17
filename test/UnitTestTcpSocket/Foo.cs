// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel.DataAnnotations;

namespace UnitTestTcpSocket;

/// <summary>
/// Demo示例数据
/// Demo sample data
/// </summary>
public class Foo
{
    // 列头信息支持 Display DisplayName 两种标签

    /// <summary>
    /// 主键
    /// </summary>
    [Key]
    [Display(Name = "主键")]
    public int Id { get; set; }

    /// <summary>
    /// 姓名
    /// </summary>
    [Required(ErrorMessage = "{0}不能为空")]
    [Display(Name = "姓名")]
    public string? Name { get; set; }

    /// <summary>
    /// 日期
    /// </summary>
    [Display(Name = "日期")]
    public DateTime? DateTime { get; set; }

    /// <summary>
    /// 地址
    /// </summary>
    [Display(Name = "地址")]
    [Required(ErrorMessage = "{0}不能为空")]
    public string? Address { get; set; }

    /// <summary>
    /// 数量
    /// </summary>
    [Display(Name = "数量")]
    [Required]
    public int Count { get; set; }

    /// <summary>
    /// 是/否
    /// </summary>
    [Display(Name = "是/否")]
    public bool Complete { get; set; }

    /// <summary>
    /// 学历
    /// </summary>
    [Required(ErrorMessage = "请选择学历")]
    [Display(Name = "学历")]
    public EnumEducation? Education { get; set; }

    /// <summary>
    /// 爱好
    /// </summary>
    [Required(ErrorMessage = "请选择一种{0}")]
    [Display(Name = "爱好")]
    public IEnumerable<string> Hobby { get; set; } = new List<string>();

    /// <summary>
    /// 只读列，模拟数据库计算列
    /// </summary>
    [Display(Name = "只读列")]
    public int ReadonlyColumn { get; init; }
}

/// <summary>
///
/// </summary>
public enum EnumEducation
{
    /// <summary>
    ///
    /// </summary>
    [Display(Name = "小学")]
    Primary,

    /// <summary>
    ///
    /// </summary>
    [Display(Name = "中学")]
    Middle
}
