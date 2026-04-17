namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    /// <summary>
    /// 根据显示范围构建时间轴槽集合
    /// </summary>
    /// <param name="rangeStart"></param>
    /// <param name="rangeEnd"></param>
    /// <returns></returns>
    private IReadOnlyList<TimelineSlot> BuildTimelineSlots(DateTime rangeStart, DateTime rangeEnd)
    {
        var slots = new List<TimelineSlot>();
        var cursor = rangeStart;

        while (cursor <= rangeEnd)
        {
            var slotEnd = GetSlotEnd(cursor);
            var today = DateTime.Today;
            slots.Add(new TimelineSlot(
                cursor,
                slotEnd,
                BuildSlotLabel(cursor),
                BuildSlotCaption(cursor),
                today >= cursor && today <= slotEnd));

            cursor = GetNextSlot(cursor);
        }

        return slots;
    }

    /// <summary>
    /// 获取当前应显示的任务集合
    /// </summary>
    /// <returns></returns>
    private IReadOnlyList<GanttItem> GetVisibleItems()
    {
        if (Groups.Count == 0)
        {
            return FlattenVisibleItems(GetCurrentItems());
        }

        return GetCurrentGroups()
            .SelectMany(group => IsGroupCollapsed(group.Id) ? Array.Empty<GanttItem>() : FlattenVisibleItems(group.Items))
            .ToArray();
    }

    /// <summary>
    /// 基于可见任务构建行数据
    /// </summary>
    /// <param name="visibleItems"></param>
    /// <returns></returns>
    private IReadOnlyList<GanttRow> BuildRows(IReadOnlyList<GanttItem> visibleItems)
    {
        if (Groups.Count == 0)
        {
            var rowsWithoutGroups = new List<GanttRow>();
            AppendItemRows(rowsWithoutGroups, GetCurrentItems(), null, 0);
            return rowsWithoutGroups;
        }

        var rows = new List<GanttRow>();

        foreach (var group in GetCurrentGroups())
        {
            rows.Add(new GanttRow(GanttRowKind.Group, null, group));

            if (IsGroupCollapsed(group.Id))
            {
                continue;
            }

            AppendItemRows(rows, group.Items, group, 0);
        }

        return rows;
    }

   /// <summary>
   /// 基于可见任务构建行数据
   /// </summary>
   /// <param name="groupId"></param>
   /// <returns></returns>
    private bool IsGroupCollapsed(string groupId) => collapsedGroupIds.Contains(groupId);

    /// <summary>
    /// 切换指定分组的折叠状态
    /// </summary>
    /// <param name="groupId"></param>
    private void ToggleGroup(string groupId)
    {
        if (!collapsedGroupIds.Add(groupId))
        {
            collapsedGroupIds.Remove(groupId);
        }
        InvalidateComputedState();
    }

    /// <summary>
    /// 判断指定任务是否处于折叠状态
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private bool IsItemCollapsed(GanttItem item) => collapsedItemIds.Contains(GetResolvedItemId(item));

    /// <summary>
    /// 判断指定任务是否处于折叠状态
    /// </summary>
    /// <param name="itemId"></param>
    private void ToggleItem(string itemId)
    {
        if (!collapsedItemIds.Add(itemId))
        {
            collapsedItemIds.Remove(itemId);
        }

        InvalidateComputedState();
    }

    /// <summary>
    /// 获取分组内可见有效任务数量
    /// </summary>
    /// <param name="group"></param>
    /// <returns></returns>
    private int GetGroupVisibleItemCount(GanttGroup group) =>
        CountValidItems(group.Items);

    /// <summary>
    /// 获取任务的最终标识
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private string GetResolvedItemId(GanttItem item) =>
        string.IsNullOrWhiteSpace(item.Id) ? item.Name : item.Id;

    /// <summary>
    /// 获取用于渲染的任务对象，必要时汇总子任务信息
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private GanttItem GetRenderedItem(GanttItem item)
    {
        if (item.Children is not { Count: > 0 })
        {
            return item;
        }

        var renderedChildren = item.Children
            .Select(GetRenderedItem)
            .Where(child => child.IsMilestone || child.End.Date >= child.Start.Date)
            .ToArray();

        if (renderedChildren.Length == 0)
        {
            return CloneItem(item, isSummary: true);
        }

        var start = renderedChildren.Min(child => child.Start);
        var end = renderedChildren.Max(child => child.End);
        var progress = ComputeSummaryProgress(renderedChildren);
        return CloneItem(
            item,
            start: start,
            end: end,
            progress: progress,
            isSummary: true,
            children: renderedChildren);
    }

    /// <summary>
    /// 展开可见任务树为线性列表
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    private IReadOnlyList<GanttItem> FlattenVisibleItems(IReadOnlyList<GanttItem> items)
    {
        var result = new List<GanttItem>();

        foreach (var item in items)
        {
            if (item.IsMilestone || item.End.Date >= item.Start.Date)
            {
                result.Add(item);
            }

            if (item.Children is { Count: > 0 } && !IsItemCollapsed(item))
            {
                result.AddRange(FlattenVisibleItems(item.Children));
            }
        }

        return result;
    }

    /// <summary>
    /// 向行集合追加任务及其子任务行
    /// </summary>
    /// <param name="rows"></param>
    /// <param name="items"></param>
    /// <param name="group"></param>
    /// <param name="level"></param>
    private void AppendItemRows(List<GanttRow> rows, IReadOnlyList<GanttItem> items, GanttGroup? group, int level)
    {
        foreach (var item in items)
        {
            if (!item.IsMilestone && item.End.Date < item.Start.Date)
            {
                continue;
            }

            var hasChildren = item.Children is { Count: > 0 };
            rows.Add(new GanttRow(GanttRowKind.Item, item, group, level, hasChildren));

            if (hasChildren && !IsItemCollapsed(item))
            {
                AppendItemRows(rows, item.Children!, group, level + 1);
            }
        }
    }

   /// <summary>
   /// 向行集合追加任务及其子任务行
   /// </summary>
   /// <param name="items"></param>
   /// <returns></returns>
    private static int CountValidItems(IReadOnlyList<GanttItem> items)
    {
        var count = 0;

        foreach (var item in items)
        {
            if (item.IsMilestone || item.End.Date >= item.Start.Date)
            {
                count++;
            }

            if (item.Children is { Count: > 0 })
            {
                count += CountValidItems(item.Children);
            }
        }

        return count;
    }

    /// <summary>
    /// 计算汇总任务的加权完成度
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    private static double? ComputeSummaryProgress(IReadOnlyList<GanttItem> items)
    {
        var weightedTotal = 0d;
        var durationTotal = 0d;

        foreach (var item in items)
        {
            var duration = Math.Max(1d, (item.End.Date - item.Start.Date).Days + 1d);
            durationTotal += duration;
            weightedTotal += duration * Math.Clamp(item.Progress ?? 0d, 0d, 100d);
        }

        if (durationTotal <= 0d)
        {
            return null;
        }

        return weightedTotal / durationTotal;
    }
}
