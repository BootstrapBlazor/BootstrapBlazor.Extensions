namespace BootstrapBlazor.Gantt;

/// <summary>
/// 表示一次任务更新结果
/// </summary>
public sealed class GanttItemUpdate
{
    /// <summary>
    /// 使用指定参数初始化任务更新结果
    /// </summary>
    /// <param name="itemId">更新的任务标识</param>
    /// <param name="originalItem">更新前的任务数据</param>
    /// <param name="item">更新后的任务数据</param>
    /// <param name="operation">更新操作类型</param>
    public GanttItemUpdate(
        string itemId,
        GanttItem originalItem,
        GanttItem item,
        GanttDragOperation operation)
    {
        ItemId = itemId;
        OriginalItem = originalItem;
        Item = item;
        Operation = operation;
    }

    /// <summary>
    /// <para lang="zh">获取或设置 更新的任务标识</para>
    /// <para lang="en">Gets or sets the updated task identifier</para>
    /// </summary>
    public string ItemId { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 更新前的任务数据</para>
    /// <para lang="en">Gets or sets the task data before the update</para>
    /// </summary>
    public GanttItem OriginalItem { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 更新后的任务数据</para>
    /// <para lang="en">Gets or sets the task data after the update</para>
    /// </summary>
    public GanttItem Item { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 更新操作类型</para>
    /// <para lang="en">Gets or sets the update operation type</para>
    /// </summary>
    public GanttDragOperation Operation { get; set; }
}
