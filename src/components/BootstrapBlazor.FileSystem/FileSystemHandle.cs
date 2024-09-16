// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 文件系统句柄
/// </summary>
public class FileSystemHandle
{

    /// <summary>
    /// 名称
    /// </summary>
    /// <returns></returns>
    [DisplayName("名称")]
    public string? name { get; set; }

    /// <summary>
    /// 类型<para>'file'</para><para>'directory'</para>
    /// </summary>
    /// <returns></returns>
    [DisplayName("类型")]
    public string? kind { get; set; }

    /// <summary>
    /// 查询/请求权限
    /// <para>'granted'</para><para>'no'</para>
    /// <para></para>
    /// const opts = {};<para></para>
    /// opts.mode = 'readwrite';<para></para>
    /// fileHandle.queryPermission(opts)<para></para>
    /// </summary>
    /// <returns></returns>
    [DisplayName("类型")]
    public string? Permission { get; set; }
    public string? contents { get; set; }

    public string? status { get; set; }

}

/// <summary>
/// 文件信息
/// </summary>
public class FileInfo
{
    public long lastModified { get; set; }
    public string? lastModifiedDate { get; set; }
    public string? name { get; set; }
    public long size { get; set; }
    public string? type { get; set; }

    /// <summary>
    /// 类型<para>'file'</para><para>'directory'</para>
    /// </summary>
    /// <returns></returns>
    [DisplayName("类型")]
    public string? kind { get; set; }
    public string? webkitRelativePath { get; set; }

}

