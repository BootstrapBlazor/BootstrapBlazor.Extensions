namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    /// <summary>
    /// 构建依赖线段集合
    /// </summary>
    /// <param name="visibleItems"></param>
    /// <param name="visibleRows"></param>
    /// <param name="criticalPath"></param>
    /// <returns></returns>
    private IReadOnlyList<DependencySegment> BuildDependencySegments(
        IReadOnlyList<GanttItem> visibleItems,
        IReadOnlyList<GanttRow> visibleRows,
        CriticalPathState criticalPath)
    {
        if (!ShowDependencies || visibleRows.Count == 0)
        {
            return Array.Empty<DependencySegment>();
        }

        var layout = BuildDependencyLayout(visibleRows);
        var segments = new List<DependencySegment>();
        var segmentIndex = 0;

        foreach (var item in visibleItems.Select(GetRenderedItem))
        {
            if (item.Children is { Count: > 0 } || item.IsSummary)
            {
                continue;
            }

            var successorId = GetResolvedItemId(item);
            if (!layout.RowIndexById.TryGetValue(successorId, out var successorRowIndex))
            {
                continue;
            }

            foreach (var dependencyId in item.Dependencies ?? Array.Empty<string>())
            {
                if (!layout.ItemById.TryGetValue(dependencyId, out var predecessor))
                {
                    continue;
                }

                if (!layout.RowIndexById.TryGetValue(dependencyId, out var predecessorRowIndex))
                {
                    continue;
                }

                if (predecessor.Children is { Count: > 0 } || predecessor.IsSummary)
                {
                    continue;
                }

                segments.Add(new DependencySegment(
                    BuildDependencyGeometry(predecessor, predecessorRowIndex, item, successorRowIndex, segmentIndex++, layout.ItemByRowIndex, layout.RowCenterByIndex),
                    criticalPath.DependencyKeys.Contains(BuildDependencyKey(dependencyId, successorId))));
            }
        }

        return segments;
    }

    /// <summary>
    /// 构建依赖线布局索引
    /// </summary>
    /// <param name="visibleRows"></param>
    /// <returns></returns>
    private DependencyLayout BuildDependencyLayout(IReadOnlyList<GanttRow> visibleRows)
    {
        var rowIndexById = new Dictionary<string, int>(StringComparer.Ordinal);
        var itemById = new Dictionary<string, GanttItem>(StringComparer.Ordinal);
        var itemByRowIndex = new Dictionary<int, GanttItem>();
        var rowCenterByIndex = new Dictionary<int, double>();
        var currentTop = 0d;

        for (var index = 0; index < visibleRows.Count; index++)
        {
            var row = visibleRows[index];
            var rowHeight = GetRenderedRowHeight(row);
            rowCenterByIndex[index] = currentTop + (rowHeight / 2d);

            var sourceItem = visibleRows[index].Item;
            if (sourceItem is null)
            {
                currentTop += rowHeight + RowGapPx;
                continue;
            }

            var item = GetRenderedItem(sourceItem);
            var itemId = GetResolvedItemId(item);
            rowIndexById[itemId] = index;
            itemById[itemId] = item;
            itemByRowIndex[index] = item;
            currentTop += rowHeight + RowGapPx;
        }

        return new DependencyLayout(rowIndexById, itemById, itemByRowIndex, rowCenterByIndex);
    }

    /// <summary>
    /// <para lang="zh">构建任务条渲染状态</para>
    /// <para lang="en">Builds the render state of a task bar</para>
    /// </summary>
    private TaskBarState BuildTaskBarState(GanttItem item)
    {
        var resolvedItemId = GetResolvedItemId(item);
        var startIndex = GetItemStartIndex(item);
        var endIndex = GetItemEndIndex(item);
        var constraints = GetItemConstraints(item);
        var widthPixel = item.IsMilestone ? 0d : GetBarWidthPixel(item);
        return new TaskBarState(
            BuildBarClass(item),
            BuildBarStyle(item),
            BuildTooltip(item),
            BuildBarLabel(item, widthPixel),
            BuildBarLabelClass(item, widthPixel),
            BuildDescendantItemIdsText(item),
            BuildDragHandleState(resolvedItemId, item, GanttDragOperation.Move, startIndex, endIndex, constraints),
            BuildDragHandleState(resolvedItemId, item, GanttDragOperation.ResizeStart, startIndex, endIndex, constraints),
            BuildDragHandleState(resolvedItemId, item, GanttDragOperation.ResizeEnd, startIndex, endIndex, constraints),
            BuildProgressHandleState(resolvedItemId, item));
    }

    /// <summary>
    /// <para lang="zh">构建所有后代任务标识文本</para>
    /// <para lang="en">Builds the descendant task identifier text</para>
    /// </summary>
    private string BuildDescendantItemIdsText(GanttItem item)
    {
        if (item.Children is not { Count: > 0 })
        {
            return string.Empty;
        }

        var ids = new List<string>();
        AppendDescendantItemIds(ids, item.Children);
        return ids.Count == 0 ? string.Empty : string.Join(",", ids);
    }

    /// <summary>
    /// <para lang="zh">递归追加后代任务标识</para>
    /// <para lang="en">Recursively appends descendant task identifiers</para>
    /// </summary>
    private void AppendDescendantItemIds(List<string> ids, IReadOnlyList<GanttItem> items)
    {
        foreach (var item in items)
        {
            ids.Add(GetResolvedItemId(item));

            if (item.Children is { Count: > 0 })
            {
                AppendDescendantItemIds(ids, item.Children);
            }
        }
    }

    /// <summary>
    /// <para lang="zh">构建依赖任务标识文本</para>
    /// <para lang="en">Builds the dependency task identifier text</para>
    /// </summary>
    private static string BuildDependencyIdsText(GanttItem item) =>
        item.Dependencies is { Count: > 0 }
            ? string.Join(",", item.Dependencies)
            : string.Empty;

    /// <summary>
    /// <para lang="zh">构建直接子任务标识文本</para>
    /// <para lang="en">Builds the direct child task identifier text</para>
    /// </summary>
    private string BuildChildItemIdsText(GanttItem item) =>
        item.Children is { Count: > 0 }
            ? string.Join(",", item.Children.Select(GetResolvedItemId))
            : string.Empty;

    /// <summary>
    /// <para lang="zh">构建拖拽手柄状态</para>
    /// <para lang="en">Builds the drag handle state</para>
    /// </summary>
    private DragHandleState BuildDragHandleState(
        string itemId,
        GanttItem item,
        GanttDragOperation operation,
        int startIndex,
        int endIndex,
        DragConstraint constraints)
    {
        var spanUnits = Math.Max(1, endIndex - startIndex + 1);
        var maxStartIndex = Math.Min(Math.Max(0, TimelineSlots.Count - spanUnits), constraints.MaxEndIndex - spanUnits + 1);
        var minDeltaSlots = operation switch
        {
            GanttDragOperation.ResizeStart => constraints.MinStartIndex - startIndex,
            GanttDragOperation.ResizeEnd => startIndex - endIndex,
            _ => Math.Max(0, constraints.MinStartIndex) - startIndex
        };
        var maxDeltaSlots = operation switch
        {
            GanttDragOperation.ResizeStart => endIndex - startIndex,
            GanttDragOperation.ResizeEnd => constraints.MaxEndIndex - endIndex,
            _ => Math.Max(constraints.MinStartIndex, maxStartIndex) - startIndex
        };

        return new DragHandleState(
            itemId,
            item.IsMilestone ? "true" : "false",
            (int)ResolvedViewMode,
            startIndex,
            endIndex,
            constraints.MinStartIndex,
            constraints.MaxEndIndex,
            TimelineSlots.Count,
            (int)operation,
            minDeltaSlots,
            maxDeltaSlots);
    }

    /// <summary>
    /// <para lang="zh">构建进度手柄状态</para>
    /// <para lang="en">Builds the progress handle state</para>
    /// </summary>
    private static ProgressHandleState? BuildProgressHandleState(string itemId, GanttItem item) =>
        item.IsMilestone || item.Progress is null || item.Children is { Count: > 0 }
            ? null
            : new ProgressHandleState(
                itemId,
                Math.Clamp(item.Progress.Value, 0d, 100d).ToString("F2", System.Globalization.CultureInfo.InvariantCulture),
                BuildProgressHandleStyle(item.Progress.Value));

    /// <summary>
    /// <para lang="zh">构建进度手柄样式</para>
    /// <para lang="en">Builds the progress handle style</para>
    /// </summary>
    private static string BuildProgressHandleStyle(double progress)
    {
        var clamped = Math.Clamp(progress, 0d, 100d);
        return $"left:calc({clamped:F2}% - 0.38rem);";
    }

    /// <summary>
    /// <para lang="zh">构建任务条内联样式</para>
    /// <para lang="en">Builds the inline style of a task bar</para>
    /// </summary>
    private string BuildBarStyle(GanttItem item)
    {
        var trackWidth = GetTrackPixelWidth();
        if (trackWidth <= 0)
        {
            return item.IsMilestone
                ? $"left:0;background:{item.Color};"
                : $"left:0;width:0;--gantt-bar-color:{item.Color};";
        }

        var startPixel = GetBarStartPixel(item);
        var widthPixel = item.IsMilestone ? 0d : GetBarWidthPixel(item);
        var left = Math.Clamp(startPixel * 100d / trackWidth, 0d, 100d);
        var width = Math.Clamp(Math.Min(widthPixel, Math.Max(0d, trackWidth - startPixel)) * 100d / trackWidth, 0d, 100d);

        return item.IsMilestone
            ? $"left:calc({left:F4}% - 0.7rem);background:{item.Color};"
            : $"left:{left:F4}%;width:{Math.Min(width, 100d - left):F4}%;--gantt-bar-color:{item.Color};";
    }

    /// <summary>
    /// <para lang="zh">构建单条依赖线的几何信息</para>
    /// <para lang="en">Builds the geometry information of a single dependency line</para>
    /// </summary>
    private DependencyGeometry BuildDependencyGeometry(
        GanttItem predecessor,
        int predecessorRowIndex,
        GanttItem successor,
        int successorRowIndex,
        int segmentIndex,
        IReadOnlyDictionary<int, GanttItem> itemByRowIndex,
        IReadOnlyDictionary<int, double> rowCenterByIndex)
    {
        var exitX = GetDependencyExitX(predecessor);
        var entryX = GetDependencyEntryX(successor);
        var startY = GetRowCenterY(predecessorRowIndex, rowCenterByIndex);
        var endY = GetRowCenterY(successorRowIndex, rowCenterByIndex);
        var intermediateMaxX = GetIntermediateRowsMaxExitX(predecessorRowIndex, successorRowIndex, itemByRowIndex);
        var entryStubX = Math.Max(6d, entryX - GetEntryStubWidth(successor));
        var corridorX = GetDependencyCorridorX(predecessor, successor, segmentIndex, intermediateMaxX, entryStubX);

        if (predecessorRowIndex == successorRowIndex)
        {
            var loopY = Math.Max(8d, startY - ((RowHeight / 2d) + 18d + ((segmentIndex % 4) * 8d)));
            var loopX = Math.Min(GetSvgMaxX(), Math.Max(corridorX, Math.Max(exitX, entryX) + 18d));
            return new DependencyGeometry(
                $"M {exitX:F2} {startY:F2} L {loopX:F2} {startY:F2} L {loopX:F2} {loopY:F2} L {entryStubX:F2} {loopY:F2} L {entryStubX:F2} {endY:F2} L {entryX:F2} {endY:F2}",
                BuildArrowPoints(entryStubX, endY, entryX, endY));
        }

        if (TryBuildCompactDependencyPath(exitX, startY, entryX, entryStubX, endY, intermediateMaxX, out var compactPath))
        {
            return new DependencyGeometry(compactPath, BuildArrowPoints(entryStubX, endY, entryX, endY));
        }

        return new DependencyGeometry(
            $"M {exitX:F2} {startY:F2} L {corridorX:F2} {startY:F2} L {corridorX:F2} {endY:F2} L {entryStubX:F2} {endY:F2} L {entryX:F2} {endY:F2}",
            BuildArrowPoints(entryStubX, endY, entryX, endY));
    }

    /// <summary>
    /// <para lang="zh">尝试构建紧凑型依赖线路径</para>
    /// <para lang="en">Attempts to build a compact dependency path</para>
    /// </summary>
    private bool TryBuildCompactDependencyPath(
        double exitX,
        double startY,
        double entryX,
        double entryStubX,
        double endY,
        double intermediateMaxX,
        out string path)
    {
        const double compactClearance = 22d;
        const double compactStubGap = 16d;

        var compactX = Math.Max(exitX + compactClearance, intermediateMaxX + compactClearance);
        compactX = Math.Min(compactX, entryStubX - compactStubGap);

        if (compactX <= exitX + 8d || compactX >= entryStubX - 8d)
        {
            path = string.Empty;
            return false;
        }

        path = $"M {exitX:F2} {startY:F2} L {compactX:F2} {startY:F2} L {compactX:F2} {endY:F2} L {entryStubX:F2} {endY:F2} L {entryX:F2} {endY:F2}";
        return true;
    }

    /// <summary>
    /// <para lang="zh">计算依赖线走廊的横向位置</para>
    /// <para lang="en">Calculates the horizontal corridor position of a dependency line</para>
    /// </summary>
    private double GetDependencyCorridorX(
        GanttItem predecessor,
        GanttItem successor,
        int segmentIndex,
        double intermediateMaxX,
        double entryStubX)
    {
        const double baseLaneGap = 22d;
        const double laneSpacing = 18d;
        const double successorClearance = 16d;
        var endpointMaxX = Math.Max(GetDependencyExitX(predecessor), intermediateMaxX);
        var laneOffset = baseLaneGap + (segmentIndex * laneSpacing);
        var desiredCorridorX = endpointMaxX + laneOffset;
        var maxCorridorX = Math.Min(GetSvgMaxX(), entryStubX - successorClearance);

        if (maxCorridorX <= endpointMaxX + 8d)
        {
            return Math.Min(GetSvgMaxX(), endpointMaxX + 8d);
        }

        return Math.Min(maxCorridorX, desiredCorridorX);
    }

    /// <summary>
    /// <para lang="zh">获取依赖线进入任务前的短引线宽度</para>
    /// <para lang="en">Gets the stub width before a dependency line enters a task</para>
    /// </summary>
    private static double GetEntryStubWidth(GanttItem item) => item.IsMilestone ? 4d : 6d;

    /// <summary>
    /// <para lang="zh">构建箭头顶点文本</para>
    /// <para lang="en">Builds the arrow polygon point text</para>
    /// </summary>
    private static string BuildArrowPoints(double fromX, double fromY, double tipX, double tipY)
    {
        const double arrowLength = 7d;
        const double arrowHalfHeight = 3.8d;
        var dx = tipX - fromX;
        var dy = tipY - fromY;
        var length = Math.Sqrt((dx * dx) + (dy * dy));

        if (length <= double.Epsilon)
        {
            dx = -1d;
            dy = 0d;
            length = 1d;
        }

        var ux = dx / length;
        var uy = dy / length;
        var baseX = tipX - (ux * arrowLength);
        var baseY = tipY - (uy * arrowLength);
        var perpX = -uy * arrowHalfHeight;
        var perpY = ux * arrowHalfHeight;
        var leftX = baseX + perpX;
        var leftY = baseY + perpY;
        var rightX = baseX - perpX;
        var rightY = baseY - perpY;

        return $"{tipX:F2},{tipY:F2} {leftX:F2},{leftY:F2} {rightX:F2},{rightY:F2}";
    }

    /// <summary>
    /// <para lang="zh">获取中间行中最大的依赖出口坐标</para>
    /// <para lang="en">Gets the maximum dependency exit coordinate among intermediate rows</para>
    /// </summary>
    private double GetIntermediateRowsMaxExitX(int predecessorRowIndex, int successorRowIndex, IReadOnlyDictionary<int, GanttItem> itemByRowIndex)
    {
        var minRow = Math.Min(predecessorRowIndex, successorRowIndex) + 1;
        var maxRow = Math.Max(predecessorRowIndex, successorRowIndex) - 1;
        var intermediateMaxX = 0d;

        if (minRow > maxRow)
        {
            return 0d;
        }

        for (var rowIndex = minRow; rowIndex <= maxRow; rowIndex++)
        {
            if (!itemByRowIndex.TryGetValue(rowIndex, out var item))
            {
                continue;
            }

            intermediateMaxX = Math.Max(intermediateMaxX, GetDependencyExitX(item));
        }

        return intermediateMaxX;
    }

    /// <summary>
    /// <para lang="zh">获取指定行的垂直中心坐标</para>
    /// <para lang="en">Gets the vertical center coordinate of the specified row</para>
    /// </summary>
    private double GetRowCenterY(int rowIndex, IReadOnlyDictionary<int, double> rowCenterByIndex) =>
        rowCenterByIndex.TryGetValue(rowIndex, out var centerY)
            ? centerY
            : 0d;

    /// <summary>
    /// <para lang="zh">获取渲染后的行高</para>
    /// <para lang="en">Gets the rendered row height</para>
    /// </summary>
    private double GetRenderedRowHeight(GanttRow row) =>
        row.Kind is GanttRowKind.Item
            ? Math.Max(1d, RowHeight - 6d)
            : RowHeight;

    /// <summary>
    /// <para lang="zh">获取任务条起点的 SVG 横坐标</para>
    /// <para lang="en">Gets the SVG X coordinate of the task bar start</para>
    /// </summary>
    private double GetBarStartX(GanttItem item) => GetBarStartPercent(item) * 10d;

    /// <summary>
    /// <para lang="zh">获取任务条终点的 SVG 横坐标</para>
    /// <para lang="en">Gets the SVG X coordinate of the task bar end</para>
    /// </summary>
    private double GetBarEndX(GanttItem item)
    {
        var startX = GetBarStartX(item);
        if (item.IsMilestone)
        {
            return startX;
        }

        var trackWidth = GetTrackPixelWidth();
        if (trackWidth <= 0)
        {
            return startX;
        }

        var endPixel = GetBarStartPixel(item) + GetBarWidthPixel(item);
        return Math.Clamp(endPixel * 1000d / trackWidth, 0d, 1000d);
    }

    /// <summary>
    /// <para lang="zh">获取任务条起点百分比位置</para>
    /// <para lang="en">Gets the percentage position of the task bar start</para>
    /// </summary>
    private double GetBarStartPercent(GanttItem item)
    {
        var trackWidth = GetTrackPixelWidth();
        if (trackWidth <= 0)
        {
            return 0d;
        }

        return Math.Clamp(GetBarStartPixel(item) * 100d / trackWidth, 0d, 100d);
    }

    /// <summary>
    /// <para lang="zh">获取任务条起点像素位置</para>
    /// <para lang="en">Gets the pixel position of the task bar start</para>
    /// </summary>
    private double GetBarStartPixel(GanttItem item)
    {
        var startIndex = GetItemStartIndex(item);
        if (ResolvedViewMode == GanttViewMode.Day)
        {
            return startIndex * GetSlotStepWidth();
        }

        var slot = TimelineSlots[startIndex];
        var offsetDays = Math.Clamp((item.Start.Date - slot.Start.Date).Days, 0, GetSlotDayCount(slot) - 1);
        var offsetRatio = offsetDays / (double)GetSlotDayCount(slot);
        return (startIndex * GetSlotStepWidth()) + (offsetRatio * MinColumnWidth);
    }

    /// <summary>
    /// <para lang="zh">获取任务条宽度像素值</para>
    /// <para lang="en">Gets the pixel width of the task bar</para>
    /// </summary>
    private double GetBarWidthPixel(GanttItem item)
    {
        if (item.IsMilestone)
        {
            return 0d;
        }

        if (ResolvedViewMode == GanttViewMode.Day)
        {
            var startIndex = GetItemStartIndex(item);
            var endIndex = GetItemEndIndex(item);
            var slotCount = Math.Max(1, endIndex - startIndex + 1);
            return (slotCount * MinColumnWidth) + (Math.Max(0, slotCount - 1) * CellGapPx);
        }

        var startPixel = GetBarStartPixel(item);
        var endPixel = GetBarEndPixel(item);
        var proportionalWidth = Math.Max(0d, endPixel - startPixel);
        var minimumVisibleWidth = GetMinimumVisibleBarWidth();
        return Math.Max(proportionalWidth, minimumVisibleWidth);
    }

    /// <summary>
    /// <para lang="zh">获取任务条终点像素位置</para>
    /// <para lang="en">Gets the pixel position of the task bar end</para>
    /// </summary>
    private double GetBarEndPixel(GanttItem item)
    {
        var endIndex = GetItemEndIndex(item);
        if (ResolvedViewMode == GanttViewMode.Day)
        {
            return GetBarStartPixel(item) + GetBarWidthPixel(item);
        }

        var slot = TimelineSlots[endIndex];
        var coveredDays = Math.Clamp((item.End.Date - slot.Start.Date).Days + 1, 1, GetSlotDayCount(slot));
        var coveredRatio = coveredDays / (double)GetSlotDayCount(slot);
        return (endIndex * GetSlotStepWidth()) + (coveredRatio * MinColumnWidth);
    }

    /// <summary>
    /// <para lang="zh">获取时间槽包含的天数</para>
    /// <para lang="en">Gets the number of days contained in a timeline slot</para>
    /// </summary>
    private static int GetSlotDayCount(TimelineSlot slot) =>
        Math.Max(1, (slot.End.Date - slot.Start.Date).Days + 1);

    /// <summary>
    /// <para lang="zh">获取任务条最小可见宽度</para>
    /// <para lang="en">Gets the minimum visible width of a task bar</para>
    /// </summary>
    private double GetMinimumVisibleBarWidth() =>
        ResolvedViewMode switch
        {
            GanttViewMode.Day => 0d,
            GanttViewMode.Week => 18d,
            _ => 20d
        };

    /// <summary>
    /// <para lang="zh">获取依赖线进入点坐标</para>
    /// <para lang="en">Gets the entry coordinate of a dependency line</para>
    /// </summary>
    private double GetDependencyEntryX(GanttItem item)
    {
        if (!item.IsMilestone)
        {
            return GetBarStartX(item);
        }

        return Math.Max(0d, GetBarStartX(item) - GetMilestoneHalfWidthSvgUnits());
    }

    /// <summary>
    /// <para lang="zh">获取依赖线离开点坐标</para>
    /// <para lang="en">Gets the exit coordinate of a dependency line</para>
    /// </summary>
    private double GetDependencyExitX(GanttItem item)
    {
        if (!item.IsMilestone)
        {
            return GetBarEndX(item);
        }

        return Math.Min(GetSvgMaxX(), GetBarStartX(item) + GetMilestoneHalfWidthSvgUnits());
    }

    /// <summary>
    /// <para lang="zh">获取里程碑半宽的 SVG 单位值</para>
    /// <para lang="en">Gets the milestone half-width in SVG units</para>
    /// </summary>
    private double GetMilestoneHalfWidthSvgUnits()
    {
        var trackWidth = GetTrackPixelWidth();
        if (trackWidth <= 0)
        {
            return 0d;
        }

        const double milestoneHalfWidthPx = 11.2d;
        return (milestoneHalfWidthPx / trackWidth) * GetSvgMaxX();
    }

    /// <summary>
    /// <para lang="zh">获取 SVG 逻辑最大横坐标</para>
    /// <para lang="en">Gets the maximum logical X coordinate of the SVG</para>
    /// </summary>
    private static double GetSvgMaxX() => 1000d;

    /// <summary>
    /// <para lang="zh">构建进度条样式</para>
    /// <para lang="en">Builds the progress bar style</para>
    /// </summary>
    private static string BuildProgressStyle(double progress) =>
        $"width:{Math.Clamp(progress, 0d, 100d):F0}%;";

    /// <summary>
    /// <para lang="zh">构建今天标记线样式</para>
    /// <para lang="en">Builds the today marker style</para>
    /// </summary>
    private string BuildMarkerStyle(double offset) => $"left:{offset:F4}%;";

    /// <summary>
    /// <para lang="zh">构建任务条提示文本</para>
    /// <para lang="en">Builds the tooltip text of a task bar</para>
    /// </summary>
    private string BuildTooltip(GanttItem item)
    {
        var type = item.IsMilestone ? "里程碑" : item.Children is { Count: > 0 } || item.IsSummary ? "摘要任务" : "任务";
        var progress = item.Progress is null ? string.Empty : $" | 进度：{Math.Clamp(item.Progress.Value, 0d, 100d):F0}%";
        var issue = GetScheduleIssueMessage(item);
        var issueText = string.IsNullOrWhiteSpace(issue) ? string.Empty : $" | 异常：{issue}";
        return $"{type}：{item.Name} | 时间：{item.Start:yyyy-MM-dd} - {item.End:yyyy-MM-dd}{progress}{issueText}";
    }

    /// <summary>
    /// <para lang="zh">构建任务条样式类</para>
    /// <para lang="en">Builds the CSS class list of a task bar</para>
    /// </summary>
    private string BuildBarClass(GanttItem item)
    {
        var classes = new List<string> { "gantt-chart__bar" };

        if (item.IsMilestone)
        {
            classes.Add("gantt-chart__bar--milestone");
        }

        if (item.IsSummary)
        {
            classes.Add("gantt-chart__bar--summary");
        }

        if (ShowCriticalPath && CriticalPath.ItemIds.Contains(GetResolvedItemId(item)))
        {
            classes.Add("gantt-chart__bar--critical");
        }

        if (HasResourceConflict(item))
        {
            classes.Add("gantt-chart__bar--conflict");
        }

        if (HasScheduleIssue(item))
        {
            classes.Add("gantt-chart__bar--invalid");
        }

        if (!string.IsNullOrWhiteSpace(item.CssClass))
        {
            classes.Add(item.CssClass);
        }

        return string.Join(" ", classes);
    }

    /// <summary>
    /// <para lang="zh">构建任务条标签文本</para>
    /// <para lang="en">Builds the label text of a task bar</para>
    /// </summary>
    private string BuildBarLabel(GanttItem item, double widthPixel)
    {
        if (item.IsMilestone)
        {
            return item.Name;
        }

        if (widthPixel < 56d)
        {
            return string.Empty;
        }

        if (widthPixel < 104d)
        {
            return BuildCompactLabel(item.Name);
        }

        return item.Name;
    }

    /// <summary>
    /// <para lang="zh">构建紧凑模式标签文本</para>
    /// <para lang="en">Builds the compact label text</para>
    /// </summary>
    private static string BuildCompactLabel(string name)
    {
        if (string.IsNullOrWhiteSpace(name) || name.Length <= 2)
        {
            return name;
        }

        return $"{name[..2]}…";
    }

    /// <summary>
    /// <para lang="zh">构建任务条标签样式类</para>
    /// <para lang="en">Builds the CSS class list of a task bar label</para>
    /// </summary>
    private string BuildBarLabelClass(GanttItem item, double widthPixel)
    {
        var classes = new List<string> { "gantt-chart__bar-label" };

        if (item.IsMilestone)
        {
            classes.Add("gantt-chart__bar-label--milestone");
        }
        else if (widthPixel < 56d)
        {
            classes.Add("gantt-chart__bar-label--hidden");
        }
        else if (widthPixel < 104d)
        {
            classes.Add("gantt-chart__bar-label--compact");
        }

        return string.Join(" ", classes);
    }
}
