namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    /// <summary>
    /// 表示时间轴中的单个时间槽
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    /// <param name="label"></param>
    /// <param name="caption"></param>
    /// <param name="isToday"></param>
    private sealed class TimelineSlot(DateTime start, DateTime end, string label, string caption, bool isToday)
    {
        public DateTime Start { get; } = start;
        public DateTime End { get; } = end;
        public string Label { get; } = label;
        public string Caption { get; } = caption;
        public bool IsToday { get; } = isToday;
    }

    /// <summary>
    /// 表示一行可渲染的甘特图数据
    /// </summary>
    /// <param name="kind"></param>
    /// <param name="item"></param>
    /// <param name="group"></param>
    /// <param name="level"></param>
    /// <param name="hasChildren"></param>
    private sealed class GanttRow(
        GanttRowKind kind,
        GanttItem? item,
        GanttGroup? group,
        int level = 0,
        bool hasChildren = false)
    {
        public GanttRowKind Kind { get; } = kind;
        public GanttItem? Item { get; } = item;
        public GanttGroup? Group { get; } = group;
        public int Level { get; } = level;
        public bool HasChildren { get; } = hasChildren;
    }

    /// <summary>
    /// <para lang="zh">表示依赖线的基础几何信息</para>
    /// <para lang="en">Represents the base geometry information of a dependency line</para>
    /// </summary>
    private sealed class DependencyGeometry(string path, string arrowPoints)
    {
        public string Path { get; } = path;
        public string ArrowPoints { get; } = arrowPoints;
    }

    /// <summary>
    /// <para lang="zh">表示一条依赖线段及其关键路径状态</para>
    /// <para lang="en">Represents a dependency segment and its critical-path state</para>
    /// </summary>
    private sealed class DependencySegment(DependencyGeometry geometry, bool isCritical)
    {
        public DependencyGeometry Geometry { get; } = geometry;
        public bool IsCritical { get; } = isCritical;
        public string Path => Geometry.Path;
        public string ArrowPoints => Geometry.ArrowPoints;
    }

    /// <summary>
    /// <para lang="zh">表示关键路径分析结果</para>
    /// <para lang="en">Represents the critical path analysis result</para>
    /// </summary>
    private sealed class CriticalPathState(IReadOnlySet<string> itemIds, IReadOnlySet<string> dependencyKeys)
    {
        public IReadOnlySet<string> ItemIds { get; } = itemIds;
        public IReadOnlySet<string> DependencyKeys { get; } = dependencyKeys;

        public static CriticalPathState Empty { get; } =
            new(new HashSet<string>(StringComparer.Ordinal), new HashSet<string>(StringComparer.Ordinal));
    }

    /// <summary>
    /// <para lang="zh">表示资源冲突分析结果</para>
    /// <para lang="en">Represents the resource conflict analysis result</para>
    /// </summary>
    private sealed class ResourceConflictState(IReadOnlySet<string> itemIds, IReadOnlyList<string> ownerNames)
    {
        public IReadOnlySet<string> ItemIds { get; } = itemIds;
        public IReadOnlyList<string> OwnerNames { get; } = ownerNames;

        public static ResourceConflictState Empty { get; } =
            new(new HashSet<string>(StringComparer.Ordinal), Array.Empty<string>());
    }

    /// <summary>
    /// <para lang="zh">表示排程问题分析结果</para>
    /// <para lang="en">Represents the schedule issue analysis result</para>
    /// </summary>
    private sealed class ScheduleIssueState(
        IReadOnlySet<string> itemIds,
        IReadOnlyList<string> messages,
        IReadOnlyDictionary<string, string> messagesByItemId)
    {
        public IReadOnlySet<string> ItemIds { get; } = itemIds;
        public IReadOnlyList<string> Messages { get; } = messages;
        public IReadOnlyDictionary<string, string> MessagesByItemId { get; } = messagesByItemId;

        public static ScheduleIssueState Empty { get; } =
            new(
                new HashSet<string>(StringComparer.Ordinal),
                Array.Empty<string>(),
                new Dictionary<string, string>(StringComparer.Ordinal));
    }

    /// <summary>
    /// <para lang="zh">表示依赖线布局计算结果</para>
    /// <para lang="en">Represents the dependency layout calculation result</para>
    /// </summary>
    private sealed class DependencyLayout(
        IReadOnlyDictionary<string, int> rowIndexById,
        IReadOnlyDictionary<string, GanttItem> itemById,
        IReadOnlyDictionary<int, GanttItem> itemByRowIndex,
        IReadOnlyDictionary<int, double> rowCenterByIndex)
    {
        public IReadOnlyDictionary<string, int> RowIndexById { get; } = rowIndexById;
        public IReadOnlyDictionary<string, GanttItem> ItemById { get; } = itemById;
        public IReadOnlyDictionary<int, GanttItem> ItemByRowIndex { get; } = itemByRowIndex;
        public IReadOnlyDictionary<int, double> RowCenterByIndex { get; } = rowCenterByIndex;
    }

    /// <summary>
    /// <para lang="zh">表示关键路径搜索中的路径节点</para>
    /// <para lang="en">Represents a path node during critical-path search</para>
    /// </summary>
    private sealed class PathNode(double totalDuration, IReadOnlyList<string> itemIds)
    {
        public double TotalDuration { get; } = totalDuration;
        public IReadOnlyList<string> ItemIds { get; } = itemIds;
    }

    /// <summary>
    /// <para lang="zh">表示一次拖拽后投影出的时间范围</para>
    /// <para lang="en">Represents the projected time range after a drag operation</para>
    /// </summary>
    private sealed class DragRange(int startIndex, int endIndex)
    {
        public int StartIndex { get; } = startIndex;
        public int EndIndex { get; } = endIndex;
    }

    /// <summary>
    /// <para lang="zh">表示当前拖拽上下文状态</para>
    /// <para lang="en">Represents the current drag context state</para>
    /// </summary>
    private sealed class DragState(
        string itemId,
        GanttItem originalItem,
        GanttItem previewItem,
        GanttDragOperation operation,
        int spanUnits,
        int initialStartIndex,
        int initialEndIndex)
    {
        public string ItemId { get; } = itemId;
        public GanttItem OriginalItem { get; } = originalItem;
        public GanttItem PreviewItem { get; } = previewItem;
        public GanttDragOperation Operation { get; } = operation;
        public int SpanUnits { get; } = spanUnits;
        public int InitialStartIndex { get; } = initialStartIndex;
        public int InitialEndIndex { get; } = initialEndIndex;
    }

    /// <summary>
    /// <para lang="zh">表示拖拽可用范围约束</para>
    /// <para lang="en">Represents the available range constraints for dragging</para>
    /// </summary>
    private sealed class DragConstraint(int minStartIndex, int maxEndIndex)
    {
        public int MinStartIndex { get; } = minStartIndex;
        public int MaxEndIndex { get; } = maxEndIndex;
    }

    /// <summary>
    /// <para lang="zh">表示任务条拖拽手柄状态</para>
    /// <para lang="en">Represents the drag handle state of a task bar</para>
    /// </summary>
    private sealed class DragHandleState(
        string itemId,
        string isMilestoneText,
        int viewModeValue,
        int startIndex,
        int endIndex,
        int minStartIndex,
        int maxEndIndex,
        int slotCount,
        int operationValue,
        int minDeltaSlots,
        int maxDeltaSlots)
    {
        public string ItemId { get; } = itemId;
        public string IsMilestoneText { get; } = isMilestoneText;
        public int ViewModeValue { get; } = viewModeValue;
        public int StartIndex { get; } = startIndex;
        public int EndIndex { get; } = endIndex;
        public int MinStartIndex { get; } = minStartIndex;
        public int MaxEndIndex { get; } = maxEndIndex;
        public int SlotCount { get; } = slotCount;
        public int OperationValue { get; } = operationValue;
        public int MinDeltaSlots { get; } = minDeltaSlots;
        public int MaxDeltaSlots { get; } = maxDeltaSlots;
    }

    /// <summary>
    /// <para lang="zh">表示进度手柄状态</para>
    /// <para lang="en">Represents the progress handle state</para>
    /// </summary>
    private sealed class ProgressHandleState(string itemId, string progressText, string style)
    {
        public string ItemId { get; } = itemId;
        public string ProgressText { get; } = progressText;
        public string Style { get; } = style;
    }

    /// <summary>
    /// <para lang="zh">表示任务条渲染状态</para>
    /// <para lang="en">Represents the render state of a task bar</para>
    /// </summary>
    private sealed class TaskBarState(
        string className,
        string style,
        string tooltip,
        string label,
        string labelClassName,
        string descendantItemIdsText,
        DragHandleState moveHandle,
        DragHandleState resizeStartHandle,
        DragHandleState resizeEndHandle,
        ProgressHandleState? progressHandle)
    {
        public string ClassName { get; } = className;
        public string Style { get; } = style;
        public string Tooltip { get; } = tooltip;
        public string Label { get; } = label;
        public string LabelClassName { get; } = labelClassName;
        public string DescendantItemIdsText { get; } = descendantItemIdsText;
        public DragHandleState MoveHandle { get; } = moveHandle;
        public DragHandleState ResizeStartHandle { get; } = resizeStartHandle;
        public DragHandleState ResizeEndHandle { get; } = resizeEndHandle;
        public ProgressHandleState? ProgressHandle { get; } = progressHandle;
    }

    /// <summary>
    /// <para lang="zh">表示可渲染行的类型</para>
    /// <para lang="en">Represents the type of a renderable row</para>
    /// </summary>
    private enum GanttRowKind
    {
        /// <summary>
        /// <para lang="zh">分组行</para>
        /// <para lang="en">Group row</para>
        /// </summary>
        Group,
        /// <summary>
        /// <para lang="zh">任务行</para>
        /// <para lang="en">Item row</para>
        /// </summary>
        Item
    }
}
