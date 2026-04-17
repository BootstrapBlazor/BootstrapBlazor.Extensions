namespace BootstrapBlazor.Gantt;

/// <summary>
/// 表示甘特图中的任务项
/// </summary>
public sealed class GanttItem
{

    /// <summary>
    /// 使用指定参数初始化任务项
    /// </summary>
    /// <param name="name">任务名称</param>
    /// <param name="start">任务开始时间</param>
    /// <param name="end">任务结束时间</param>
    /// <param name="color">任务颜色</param>
    /// <param name="owner">任务负责人</param>
    /// <param name="progress">任务完成度</param>
    /// <param name="isMilestone">是否为里程碑</param>
    /// <param name="isSummary">是否为汇总任务</param>
    /// <param name="id">任务唯一标识</param>
    /// <param name="dependencies">前置依赖任务标识集合</param>
    /// <param name="cssClass">任务条附加样式类名</param>
    /// <param name="children">子任务集合</param>
    public GanttItem(
        string name,
        DateTime start,
        DateTime end,
        string color,
        string? owner = null,
        double? progress = null,
        bool isMilestone = false,
        bool isSummary = false,
        string? id = null,
        IReadOnlyList<string>? dependencies = null,
        string? cssClass = null,
        IReadOnlyList<GanttItem>? children = null)
    {
        Name = name;
        Start = start;
        End = end;
        Color = color;
        Owner = owner;
        Progress = progress;
        IsMilestone = isMilestone;
        IsSummary = isSummary;
        Id = id;
        Dependencies = dependencies;
        CssClass = cssClass;
        Children = children;
    }

  /// <summary>
  /// 使用现有任务项初始化一个副本
  /// </summary>
  /// <param name="source">源任务项</param>
    public GanttItem(GanttItem source)
        : this(
            source.Name,
            source.Start,
            source.End,
            source.Color,
            source.Owner,
            source.Progress,
            source.IsMilestone,
            source.IsSummary,
            source.Id,
            source.Dependencies,
            source.CssClass,
            source.Children)
    {
    }

    /// <summary>
    /// <para lang="zh">获取或设置 任务名称</para>
    /// <para lang="en">Gets or sets the task name</para>
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务开始时间</para>
    /// <para lang="en">Gets or sets the task start time</para>
    /// </summary>
    public DateTime Start { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务结束时间</para>
    /// <para lang="en">Gets or sets the task end time</para>
    /// </summary>
    public DateTime End { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务颜色</para>
    /// <para lang="en">Gets or sets the task color</para>
    /// </summary>
    public string Color { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务负责人</para>
    /// <para lang="en">Gets or sets the task owner</para>
    /// </summary>
    public string? Owner { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务完成度</para>
    /// <para lang="en">Gets or sets the task progress value</para>
    /// </summary>
    public double? Progress { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 当前任务是否为里程碑</para>
    /// <para lang="en">Gets or sets a value indicating whether the task is a milestone</para>
    /// </summary>
    public bool IsMilestone { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 当前任务是否为汇总任务</para>
    /// <para lang="en">Gets or sets a value indicating whether the task is a summary item</para>
    /// </summary>
    public bool IsSummary { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务唯一标识</para>
    /// <para lang="en">Gets or sets the unique task identifier</para>
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 前置依赖任务标识集合</para>
    /// <para lang="en">Gets or sets the predecessor dependency identifiers</para>
    /// </summary>
    public IReadOnlyList<string>? Dependencies { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 任务条附加样式类名</para>
    /// <para lang="en">Gets or sets the additional CSS class name of the task bar</para>
    /// </summary>
    public string? CssClass { get; set; }

    /// <summary>
    /// <para lang="zh">获取或设置 子任务集合</para>
    /// <para lang="en">Gets or sets the child task collection</para>
    /// </summary>
    public IReadOnlyList<GanttItem>? Children { get; set; }
}
