namespace BootstrapBlazor.Gantt;

/// <summary>
/// 表示一次整体排程更新结果
/// </summary>
public sealed class GanttScheduleUpdate
{

    /// <summary>
    /// 使用指定参数初始化排程更新结果
    /// </summary>
    /// <param name="primaryUpdate">主更新项</param>
    /// <param name="cascadedUpdates">级联更新项集合</param>
    public GanttScheduleUpdate(
        GanttItemUpdate primaryUpdate,
        IReadOnlyList<GanttItemUpdate> cascadedUpdates)
    {
        PrimaryUpdate = primaryUpdate;
        CascadedUpdates = cascadedUpdates;
    }

    /// <summary>
    /// <para lang="zh">获取或设置 主更新项</para>
    /// <para lang="en">Gets or sets the primary update item</para>
    /// </summary>
    public GanttItemUpdate PrimaryUpdate { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 级联更新项集合</para>
    /// <para lang="en">Gets or sets the cascaded update collection</para>
    /// </summary>
    public IReadOnlyList<GanttItemUpdate> CascadedUpdates { get; set; }
}
