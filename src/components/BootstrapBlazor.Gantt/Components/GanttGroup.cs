namespace BootstrapBlazor.Gantt;

/// <summary>
/// 表示甘特图中的任务分组
/// </summary>
public sealed class GanttGroup
{
    /// <summary>
    /// 使用指定参数初始化任务分组
    /// </summary>
    /// <param name="id">分组唯一标识</param>
    /// <param name="title">分组标题</param>
    /// <param name="items">分组内任务集合</param>
    /// <param name="initiallyCollapsed">分组初始是否折叠</param>
    public GanttGroup(
        string id,
        string title,
        IReadOnlyList<GanttItem> items,
        bool initiallyCollapsed = false)
    {
        Id = id;
        Title = title;
        Items = items;
        InitiallyCollapsed = initiallyCollapsed;
    }

    /// <summary>
    /// 使用现有任务分组初始化一个副本
    /// </summary>
    /// <param name="source">源任务分组</param>
    public GanttGroup(GanttGroup source)
        : this(source.Id, source.Title, source.Items, source.InitiallyCollapsed)
    {
    }

    /// <summary>
    /// <para lang="zh">获取或设置 分组唯一标识</para>
    /// <para lang="en">Gets or sets the unique group identifier</para>
    /// </summary>
    public string Id { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 分组标题</para>
    /// <para lang="en">Gets or sets the group title</para>
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 分组内任务集合</para>
    /// <para lang="en">Gets or sets the task collection in the group</para>
    /// </summary>
    public IReadOnlyList<GanttItem> Items { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 初始是否折叠</para>
    /// <para lang="en">Gets or sets a value indicating whether the group is initially collapsed</para>
    /// </summary>
    public bool InitiallyCollapsed { get; set; }
}
