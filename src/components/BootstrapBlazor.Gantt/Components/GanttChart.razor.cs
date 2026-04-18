using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Gantt;

/// <summary>
/// 
/// </summary>
public partial class GanttChart
{
    /// <summary>
    /// <para lang="zh">获取/设置 甘特图顶部的主标题</para>
    /// <para lang="en">Gets or sets the main title displayed at the top of the Gantt chart</para>
    /// </summary>
    [Parameter]
    public string? Title { get; set; } = "项目计划";

    /// <summary>
    /// <para lang="zh">获取/设置 甘特图顶部的副标题</para>
    /// <para lang="en">Gets or sets the subtitle displayed at the top of the Gantt chart</para>
    /// </summary>
    [Parameter]
    public string? Subtitle { get; set; } = "甘特图";

    /// <summary>
    /// <para lang="zh">获取/设置 左侧任务栏标题</para>
    /// <para lang="en">Gets or sets the title of the left sidebar</para>
    /// </summary>
    [Parameter]
    public string SidebarTitle { get; set; } = "任务";

    /// <summary>
    /// <para lang="zh">获取/设置 组件根节点附加的自定义样式类名</para>
    /// <para lang="en">Gets or sets the custom CSS class name appended to the component root element</para>
    /// </summary>
    [Parameter]
    public string? ClassName { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 当前甘特图视图模式</para>
    /// <para lang="en">Gets or sets the current Gantt chart view mode</para>
    /// </summary>
    [Parameter]
    public GanttViewMode ViewMode { get; set; } = GanttViewMode.Day;

    /// <summary>
    /// <para lang="zh">获取/设置 视图模式变更时的回调</para>
    /// <para lang="en">Gets or sets the callback invoked when the view mode changes</para>
    /// </summary>
    [Parameter]
    public EventCallback<GanttViewMode> ViewModeChanged { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 是否显示视图模式切换按钮</para>
    /// <para lang="en">Gets or sets a value indicating whether to show the view mode switcher</para>
    /// </summary>
    [Parameter]
    public bool ShowViewModeSwitch { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 每一行的高度</para>
    /// <para lang="en">Gets or sets the height of each row</para>
    /// </summary>
    [Parameter]
    public int RowHeight { get; set; } = 42;

    /// <summary>
    /// <para lang="zh">获取/设置 左侧侧边栏宽度</para>
    /// <para lang="en">Gets or sets the width of the left sidebar</para>
    /// </summary>
    [Parameter]
    public int SidebarWidth { get; set; } = 220;

    /// <summary>
    /// <para lang="zh">获取/设置 时间轴列的最小宽度</para>
    /// <para lang="en">Gets or sets the minimum width of each timeline column</para>
    /// </summary>
    [Parameter]
    public int MinColumnWidth { get; set; } = 64;

    /// <summary>
    /// <para lang="zh">获取/设置 是否显示今天标记线</para>
    /// <para lang="en">Gets or sets a value indicating whether to display the today marker line</para>
    /// </summary>
    [Parameter]
    public bool ShowTodayMarker { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 是否显示顶部摘要信息</para>
    /// <para lang="en">Gets or sets a value indicating whether to display the summary section</para>
    /// </summary>
    [Parameter]
    public bool ShowSummary { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 甘特图显示范围的开始日期</para>
    /// <para lang="en">Gets or sets the start date of the visible Gantt chart range</para>
    /// </summary>
    [Parameter]
    public DateTime? StartDate { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 甘特图显示范围的结束日期</para>
    /// <para lang="en">Gets or sets the end date of the visible Gantt chart range</para>
    /// </summary>
    [Parameter]
    public DateTime? EndDate { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 直接显示的任务集合</para>
    /// <para lang="en">Gets or sets the collection of tasks rendered directly by the component</para>
    /// </summary>
    [Parameter]
    public IReadOnlyList<GanttItem> Items { get; set; } = Array.Empty<GanttItem>();

    /// <summary>
    /// <para lang="zh">获取/设置 分组任务集合</para>
    /// <para lang="en">Gets or sets the grouped task collection</para>
    /// </summary>
    [Parameter]
    public IReadOnlyList<GanttGroup> Groups { get; set; } = Array.Empty<GanttGroup>();

    /// <summary>
    /// <para lang="zh">获取/设置 是否显示任务依赖连线</para>
    /// <para lang="en">Gets or sets a value indicating whether to display task dependency lines</para>
    /// </summary>
    [Parameter]
    public bool ShowDependencies { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 是否显示父子层级连线</para>
    /// <para lang="en">Gets or sets a value indicating whether to display parent-child hierarchy lines</para>
    /// </summary>
    [Parameter]
    public bool ShowHierarchyLines { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 是否高亮关键路径</para>
    /// <para lang="en">Gets or sets a value indicating whether to highlight the critical path</para>
    /// </summary>
    [Parameter]
    public bool ShowCriticalPath { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 是否允许编辑任务</para>
    /// <para lang="en">Gets or sets a value indicating whether task editing is enabled</para>
    /// </summary>
    [Parameter]
    public bool IsEditable { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 任务更新时的回调</para>
    /// <para lang="en">Gets or sets the callback invoked when a task item is updated</para>
    /// </summary>
    [Parameter]
    public Func<GanttItemUpdate, Task>? OnItemUpdated { get; set; }

    /// <summary>
    /// <para lang="zh">获取/设置 是否在任务变更后自动排程后续依赖任务</para>
    /// <para lang="en">Gets or sets a value indicating whether dependent tasks should be auto-scheduled after a task changes</para>
    /// </summary>
    [Parameter]
    public bool AutoScheduleDependents { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 是否强制执行资源与任务约束检查</para>
    /// <para lang="en">Gets or sets a value indicating whether resource and task constraint checks are enforced</para>
    /// </summary>
    [Parameter]
    public bool EnforceConstraintChecks { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获取/设置 排程整体更新时的回调</para>
    /// <para lang="en">Gets or sets the callback invoked when the schedule is updated as a whole</para>
    /// </summary>
    [Parameter]
    public Func<GanttScheduleUpdate, Task>? OnScheduleUpdated { get; set; }

    /// <summary>
    /// <para lang="zh">记录已折叠分组标识的集合</para>
    /// <para lang="en">Stores the set of collapsed group identifiers</para>
    /// </summary>
    private readonly HashSet<string> collapsedGroupIds = new(StringComparer.Ordinal);

    /// <summary>
    /// <para lang="zh">记录已折叠任务标识的集合</para>
    /// <para lang="en">Stores the set of collapsed item identifiers</para>
    /// </summary>
    private readonly HashSet<string> collapsedItemIds = new(StringComparer.Ordinal);

    /// <summary>
    /// <para lang="zh">组件实例唯一标识</para>
    /// <para lang="en">The unique identifier of the component instance</para>
    /// </summary>
    private readonly string instanceId = $"gantt-{Guid.NewGuid():N}";

    private const int RowGapPx = 8;
    private const int SectionGapPx = 12;
    private const int CellGapPx = 4;

    /// <summary>
    /// 保存乐观更新后的任务快照
    /// </summary>
    private Dictionary<string, GanttItem> optimisticItemsById = new(StringComparer.Ordinal);

   /// <summary>
   /// 组件内部维护的当前视图模式
   /// </summary>
    private GanttViewMode? internalViewMode;

    /// <summary>
    /// 最近一次接收的参数视图模式
    /// </summary>
    private GanttViewMode lastParameterViewMode;

    /// <summary>
    /// 指示是否已接收过视图模式参数
    /// </summary>
    private bool hasReceivedViewModeParameter;

    /// <summary>
    /// 指示计算缓存是否已失效
    /// </summary>
    private bool computedStateDirty = true;

    /// <summary>
    /// 指示组件是否正在计算缓存状态
    /// </summary>
    private bool computingState;

    /// <summary>
    /// 缓存的可见任务集合
    /// </summary>
    private IReadOnlyList<GanttItem> visibleItemsCache = Array.Empty<GanttItem>();

    /// <summary>
    /// 缓存的可见行集合
    /// </summary>
    private IReadOnlyList<GanttRow> visibleRowsCache = Array.Empty<GanttRow>();

    /// <summary>
    /// 缓存的依赖线段集合
    /// </summary>
    private IReadOnlyList<DependencySegment> dependencySegmentsCache = Array.Empty<DependencySegment>();

    /// <summary>
    /// 缓存的关键路径分析结果
    /// </summary>
    private CriticalPathState criticalPathCache = CriticalPathState.Empty;

    /// <summary>
    /// 缓存的资源冲突分析结果
    /// </summary>
    private ResourceConflictState resourceConflictsCache = ResourceConflictState.Empty;

    /// <summary>
    /// 缓存的排程问题分析结果
    /// </summary>
    private ScheduleIssueState scheduleIssuesCache = ScheduleIssueState.Empty;

    /// <summary>
    /// 缓存的时间轴槽集合
    /// </summary>
    private IReadOnlyList<TimelineSlot> timelineSlotsCache = Array.Empty<TimelineSlot>();

    /// <summary>
    /// 缓存的显示范围起始时间
    /// </summary>
    private DateTime rangeStartCache;

    /// <summary>
    /// 缓存的显示范围结束时间
    /// </summary>
    private DateTime rangeEndCache;

    /// <summary>
    /// 视图模式切换选项集合
    /// </summary>
    private static readonly IReadOnlyList<ViewModeOption> ViewModeOptions =
    [
        new(GanttViewMode.Day, "日视图"),
        new(GanttViewMode.Week, "周视图"),
        new(GanttViewMode.Month, "月视图")
    ];

    /// <summary>
    /// 获取当前缓存的可见任务集合
    /// </summary>
    private IReadOnlyList<GanttItem> VisibleItems => EnsureComputedState().VisibleItems;

    /// <summary>
    /// 获取当前缓存的可见行集合
    /// </summary>
    private IReadOnlyList<GanttRow> VisibleRows => EnsureComputedState().VisibleRows;

    /// <summary>
    /// 获取当前缓存的依赖线段集合
    /// </summary>
    private IReadOnlyList<DependencySegment> DependencySegments => EnsureComputedState().DependencySegments;

    /// <summary>
    /// 获取当前缓存的关键路径分析结果
    /// </summary>
    private CriticalPathState CriticalPath => EnsureComputedState().CriticalPath;

    /// <summary>
    /// 获取当前缓存的资源冲突分析结果
    /// </summary>
    private ResourceConflictState ResourceConflicts => EnsureComputedState().ResourceConflicts;

    /// <summary>
    /// 获取当前缓存的排程问题分析结果
    /// </summary>
    private ScheduleIssueState ScheduleIssues => EnsureComputedState().ScheduleIssues;

    /// <summary>
    /// 获取实际生效的视图模式
    /// </summary>
    private GanttViewMode ResolvedViewMode => internalViewMode ?? ViewMode;

    /// <summary>
    /// 
    /// </summary>
    protected override void OnParametersSet()
    {
        var validIds = Groups
            .Where(group => !string.IsNullOrWhiteSpace(group.Id))
            .Select(group => group.Id)
            .ToHashSet(StringComparer.Ordinal);

        collapsedGroupIds.RemoveWhere(id => !validIds.Contains(id));

        var validItemIds = (Groups.Count == 0
                ? FlattenParameterItems(Items)
                : Groups.SelectMany(group => FlattenParameterItems(group.Items)))
            .Select(GetResolvedItemId)
            .ToHashSet(StringComparer.Ordinal);
        collapsedItemIds.RemoveWhere(id => !validItemIds.Contains(id));

        foreach (var group in Groups.Where(group => group.InitiallyCollapsed))
        {
            collapsedGroupIds.Add(group.Id);
        }

        if (!hasReceivedViewModeParameter || lastParameterViewMode != ViewMode)
        {
            internalViewMode = ViewMode;
            lastParameterViewMode = ViewMode;
            hasReceivedViewModeParameter = true;
        }

        SynchronizeOptimisticState();
        InvalidateComputedState();
    }

    /// <summary>
    /// 获取当前缓存的显示范围开始时间
    /// </summary>
    private DateTime RangeStart
    {
        get
        {
            if (computingState)
            {
                return rangeStartCache;
            }

            EnsureComputedState();
            return rangeStartCache;
        }
    }

    /// <summary>
    /// 获取当前缓存的显示范围结束时间
    /// </summary>
    private DateTime RangeEnd
    {
        get
        {
            if (computingState)
            {
                return rangeEndCache;
            }

            EnsureComputedState();
            return rangeEndCache;
        }
    }

    /// <summary>
    /// 获取当前缓存的时间轴槽集合
    /// </summary>
    private IReadOnlyList<TimelineSlot> TimelineSlots =>
        computingState ? timelineSlotsCache : EnsureComputedState().TimelineSlots;

    /// <summary>
    /// 获取组件根节点样式变量文本
    /// </summary>
    private string RootStyle =>
        $"--gantt-sidebar-width:{SidebarWidth}px;--gantt-row-height:{RowHeight}px;--gantt-column-width:{MinColumnWidth}px;--gantt-row-gap:{RowGapPx}px;--gantt-section-gap:{SectionGapPx}px;--gantt-cell-gap:{CellGapPx}px;";

    /// <summary>
    /// 获取列数样式变量文本
    /// </summary>
    private string ColumnsStyle => $"--gantt-columns:{TimelineSlots.Count};";

    /// <summary>
    /// 获取轨道表面宽度样式文本
    /// </summary>
    private string TrackSurfaceStyle => $"width:{GetTrackPixelWidth():F0}px;";

    /// <summary>
    /// 获取依赖线画布高度
    /// </summary>
    private double DependencyCanvasHeight =>
        VisibleRows.Count == 0
            ? 0
            : VisibleRows.Sum(row => row.Kind is GanttRowKind.Item ? Math.Max(1, RowHeight - 6) : RowHeight)
              + (Math.Max(0, VisibleRows.Count - 1) * RowGapPx);

    /// <summary>
    /// 获取依赖线画布样式文本
    /// </summary>
    private string DependencyCanvasStyle =>
        $"height:{DependencyCanvasHeight:F0}px;";

    /// <summary>
    /// 获取今天标记线偏移百分比
    /// </summary>
    private double? TodayMarkerOffset
    {
        get
        {
            if (!ShowTodayMarker)
            {
                return null;
            }

            var today = DateTime.Today;
            if (today < RangeStart || today > RangeEnd)
            {
                return null;
            }

            var totalUnits = GetTotalUnits(RangeStart, RangeEnd);
            if (totalUnits <= 0)
            {
                return 0;
            }

            var offsetUnits = GetOffsetUnits(RangeStart, today);
            return Math.Clamp(offsetUnits * 100d / totalUnits, 0d, 100d);
        }
    }

    /// <summary>
    /// 表示视图模式选项
    /// </summary>
    /// <param name="mode"></param>
    /// <param name="label"></param>
    private sealed class ViewModeOption(GanttViewMode mode, string label)
    {
        public GanttViewMode Mode { get; } = mode;
        public string Label { get; } = label;
    }

    /// <summary>
    /// 表示甘特图计算后的缓存状态
    /// </summary>
    /// <param name="visibleItems"></param>
    /// <param name="visibleRows"></param>
    /// <param name="timelineSlots"></param>
    /// <param name="dependencySegments"></param>
    /// <param name="criticalPath"></param>
    /// <param name="resourceConflicts"></param>
    /// <param name="scheduleIssues"></param>
    private sealed class ComputedState(
        IReadOnlyList<GanttItem> visibleItems,
        IReadOnlyList<GanttRow> visibleRows,
        IReadOnlyList<TimelineSlot> timelineSlots,
        IReadOnlyList<DependencySegment> dependencySegments,
        CriticalPathState criticalPath,
        ResourceConflictState resourceConflicts,
        ScheduleIssueState scheduleIssues)
    {
        public IReadOnlyList<GanttItem> VisibleItems { get; } = visibleItems;
        public IReadOnlyList<GanttRow> VisibleRows { get; } = visibleRows;
        public IReadOnlyList<TimelineSlot> TimelineSlots { get; } = timelineSlots;
        public IReadOnlyList<DependencySegment> DependencySegments { get; } = dependencySegments;
        public CriticalPathState CriticalPath { get; } = criticalPath;
        public ResourceConflictState ResourceConflicts { get; } = resourceConflicts;
        public ScheduleIssueState ScheduleIssues { get; } = scheduleIssues;
    }

    /// <summary>
    /// 展开参数中的任务树
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    private static IEnumerable<GanttItem> FlattenParameterItems(IEnumerable<GanttItem> items)
    {
        foreach (var item in items)
        {
            yield return item;

            if (item.Children is not null)
            {
                foreach (var child in FlattenParameterItems(item.Children))
                {
                    yield return child;
                }
            }
        }
    }

    /// <summary>
    /// 标记计算缓存失效
    /// </summary>
    private void InvalidateComputedState() => computedStateDirty = true;

    /// <summary>
    /// 确保计算缓存已生成并返回当前状态
    /// </summary>
    /// <returns></returns>
    private ComputedState EnsureComputedState()
    {
        if (!computedStateDirty || computingState)
        {
            return new ComputedState(
                visibleItemsCache,
                visibleRowsCache,
                timelineSlotsCache,
                dependencySegmentsCache,
                criticalPathCache,
                resourceConflictsCache,
                scheduleIssuesCache);
        }

        computingState = true;

        try
        {
            visibleItemsCache = GetVisibleItems()
                .Where(item => item.IsMilestone || item.End.Date >= item.Start.Date)
                .ToArray();

            rangeStartCache = StartDate.HasValue
                ? NormalizeToSlotStart(StartDate.Value.Date)
                : NormalizeToSlotStart((visibleItemsCache.Count == 0 ? DateTime.Today : visibleItemsCache.Min(item => item.Start).Date));
            rangeEndCache = EndDate.HasValue
                ? NormalizeToSlotEnd(EndDate.Value.Date)
                : NormalizeToSlotEnd((visibleItemsCache.Count == 0 ? DateTime.Today : visibleItemsCache.Max(item => item.End.Date).Date));

            timelineSlotsCache = BuildTimelineSlots(rangeStartCache, rangeEndCache);
            visibleRowsCache = BuildRows(visibleItemsCache);
            scheduleIssuesCache = BuildScheduleIssueState(visibleItemsCache);
            resourceConflictsCache = BuildResourceConflictState(visibleItemsCache);
            criticalPathCache = BuildCriticalPathState(visibleItemsCache);
            dependencySegmentsCache = BuildDependencySegments(visibleItemsCache, visibleRowsCache, criticalPathCache);
            computedStateDirty = false;
        }
        finally
        {
            computingState = false;
        }

        return new ComputedState(
            visibleItemsCache,
            visibleRowsCache,
            timelineSlotsCache,
            dependencySegmentsCache,
            criticalPathCache,
            resourceConflictsCache,
            scheduleIssuesCache);
    }
}
