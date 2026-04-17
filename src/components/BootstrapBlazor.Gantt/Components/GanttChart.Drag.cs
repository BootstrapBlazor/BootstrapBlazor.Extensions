using Microsoft.JSInterop;

namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    /// <summary>
    /// 提交来自 JavaScript 的任务拖拽结果
    /// </summary>
    /// <param name="itemId">被操作的任务标识</param>
    /// <param name="operationValue">拖拽操作类型值</param>
    /// <param name="deltaSlots">相对原位置移动的时间槽数量</param>
    [JSInvokable]
    public async Task CommitJsDrag(string itemId, int operationValue, int deltaSlots)
    {
        if (!IsEditable)
        {
            return;
        }

        var item = VisibleItems.FirstOrDefault(candidate => GetResolvedItemId(candidate) == itemId);
        if (item is null)
        {
            return;
        }

        var operation = (GanttDragOperation)operationValue;
        var drag = new DragState(
            itemId,
            item,
            item,
            operation,
            Math.Max(1, (int)Math.Round(GetSpanUnits(item))),
            GetSlotIndexForDate(item.Start),
            GetSlotIndexForDate(item.End));
        var previewItem = BuildPreviewItem(drag, deltaSlots);

        if (AreItemsEquivalent(item, previewItem))
        {
            return;
        }

        var childUpdates = operation == GanttDragOperation.Move
            ? BuildChildMoveUpdates(item, previewItem)
            : Array.Empty<GanttItemUpdate>();
        var primaryUpdate = new GanttItemUpdate(
            itemId,
            item,
            previewItem,
            operation);
        var cascadedUpdates = AutoScheduleDependents
            ? BuildCascadedUpdates(primaryUpdate)
            : Array.Empty<GanttItemUpdate>();

        ApplyOptimisticUpdates(childUpdates.Concat(cascadedUpdates).Append(primaryUpdate));
        InvalidateComputedState();
        await InvokeAsync(StateHasChanged);

        if (OnItemUpdated != null)
        {
            await OnItemUpdated(primaryUpdate);
        }

        if (OnScheduleUpdated != null)
        {
            await OnScheduleUpdated(new GanttScheduleUpdate(primaryUpdate, childUpdates.Concat(cascadedUpdates).ToArray()));
        }
    }

    /// <summary>
    /// 提交来自 JavaScript 的进度调整结果
    /// </summary>
    /// <param name="itemId">被操作的任务标识</param>
    /// <param name="progressValue">新的完成度值</param>
    [JSInvokable]
    public async Task CommitJsProgress(string itemId, double progressValue)
    {
        if (!IsEditable)
        {
            return;
        }

        var item = VisibleItems.FirstOrDefault(candidate => GetResolvedItemId(candidate) == itemId);
        if (item is null || item.IsMilestone)
        {
            return;
        }

        var nextProgress = Math.Clamp(progressValue, 0d, 100d);
        var currentProgress = item.Progress ?? 0d;
        if (Math.Abs(currentProgress - nextProgress) < 0.5d)
        {
            return;
        }

        var previewItem = CloneItem(item, progress: nextProgress);
        var primaryUpdate = new GanttItemUpdate(
            itemId,
            item,
            previewItem,
            GanttDragOperation.Progress);

        ApplyOptimisticUpdates([primaryUpdate]);
        await InvokeAsync(StateHasChanged);

        if (OnItemUpdated != null)
        {
            await OnItemUpdated(primaryUpdate);
        }

        if (OnScheduleUpdated != null)
        {
            await OnScheduleUpdated(new GanttScheduleUpdate(primaryUpdate, Array.Empty<GanttItemUpdate>()));
        }
    }

    /// <summary>
    /// 获取当前应用乐观更新后的任务集合
    /// </summary>
    /// <returns></returns>
    private IReadOnlyList<GanttItem> GetCurrentItems() =>
        Items
            .Select(ApplyOptimisticItem)
            .ToArray();

    /// <summary>
    /// 获取当前应用乐观更新后的分组集合
    /// </summary>
    /// <returns></returns>
    private IReadOnlyList<GanttGroup> GetCurrentGroups() =>
        Groups
            .Select(group => new GanttGroup(group)
            {
                Items = group.Items
                    .Select(ApplyOptimisticItem)
                    .ToArray()
            })
            .ToArray();

    /// <summary>
    /// 将乐观更新应用到单个任务树节点
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private GanttItem ApplyOptimisticItem(GanttItem item)
    {
        var nextChildren = item.Children?.Select(ApplyOptimisticItem).ToArray();
        var itemId = GetResolvedItemId(item);
        var nextItem = optimisticItemsById.TryGetValue(itemId, out var optimisticItem)
            ? optimisticItem
            : item;

        return nextChildren is null ? nextItem : CloneItem(nextItem, children: nextChildren);
    }

    /// <summary>
    /// 应用一批乐观更新
    /// </summary>
    /// <param name="updates"></param>
    private void ApplyOptimisticUpdates(IEnumerable<GanttItemUpdate> updates)
    {
        foreach (var update in updates)
        {
            optimisticItemsById[update.ItemId] = update.Item;
        }

        InvalidateComputedState();
    }

    /// <summary>
    /// 同步并清理已过期的乐观更新状态
    /// </summary>
    private void SynchronizeOptimisticState()
    {
        if (optimisticItemsById.Count == 0)
        {
            return;
        }

        var parameterItemsById = (Groups.Count == 0
                ? FlattenAllItems(Items)
                : Groups.SelectMany(group => FlattenAllItems(group.Items)))
            .ToDictionary(GetResolvedItemId, StringComparer.Ordinal);
        var staleIds = new List<string>();

        foreach (var pair in optimisticItemsById)
        {
            if (!parameterItemsById.TryGetValue(pair.Key, out var currentItem) || AreItemsEquivalent(currentItem, pair.Value))
            {
                staleIds.Add(pair.Key);
            }
        }

        foreach (var staleId in staleIds)
        {
            optimisticItemsById.Remove(staleId);
        }

        if (staleIds.Count > 0)
        {
            InvalidateComputedState();
        }
    }

    /// <summary>
    /// 展开完整任务树
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    private static IEnumerable<GanttItem> FlattenAllItems(IEnumerable<GanttItem> items)
    {
        foreach (var item in items)
        {
            yield return item;

            if (item.Children is not null)
            {
                foreach (var child in FlattenAllItems(item.Children))
                {
                    yield return child;
                }
            }
        }
    }

    /// <summary>
    /// 构建主更新引发的级联排程更新
    /// </summary>
    /// <param name="primaryUpdate"></param>
    /// <returns></returns>
    private IReadOnlyList<GanttItemUpdate> BuildCascadedUpdates(GanttItemUpdate primaryUpdate)
    {
        var itemById = VisibleItems.ToDictionary(GetResolvedItemId, StringComparer.Ordinal);
        var working = itemById.ToDictionary(pair => pair.Key, pair => pair.Value, StringComparer.Ordinal);
        working[primaryUpdate.ItemId] = primaryUpdate.Item;

        var updates = new List<GanttItemUpdate>();
        var queue = new Queue<string>();
        queue.Enqueue(primaryUpdate.ItemId);

        while (queue.Count > 0)
        {
            var changedId = queue.Dequeue();
            var changedItem = working[changedId];

            foreach (var successor in VisibleItems.Where(item => item.Dependencies?.Contains(changedId) ?? false))
            {
                var successorId = GetResolvedItemId(successor);
                var currentSuccessor = working[successorId];
                var requiredStartIndex = GetDependencyMinStartIndex(changedItem);
                var currentStartIndex = GetSlotIndexForDate(currentSuccessor.Start);

                if (currentStartIndex >= requiredStartIndex)
                {
                    continue;
                }

                var spanUnits = Math.Max(1, (int)Math.Round(GetSpanUnits(currentSuccessor)));
                var nextStartIndex = requiredStartIndex;
                var nextEndIndex = Math.Clamp(nextStartIndex + spanUnits - 1, nextStartIndex, TimelineSlots.Count - 1);
                var shiftedSuccessor = CloneItem(
                    currentSuccessor,
                    start: TimelineSlots[nextStartIndex].Start,
                    end: TimelineSlots[nextEndIndex].End);

                working[successorId] = shiftedSuccessor;

                var existingIndex = updates.FindIndex(update => update.ItemId == successorId);
                var nextUpdate = new GanttItemUpdate(
                    successorId,
                    successor,
                    shiftedSuccessor,
                    GanttDragOperation.Move);

                if (existingIndex >= 0)
                {
                    updates[existingIndex] = nextUpdate;
                }
                else
                {
                    updates.Add(nextUpdate);
                }

                queue.Enqueue(successorId);
            }
        }

        return updates;
    }

    /// <summary>
    /// 根据拖拽状态构建预览任务
    /// </summary>
    /// <param name="drag"></param>
    /// <param name="deltaSlots"></param>
    /// <returns></returns>
    private GanttItem BuildPreviewItem(DragState drag, int deltaSlots)
    {
        var range = ProjectDragRange(drag, deltaSlots);
        var preview = CloneItem(
            drag.OriginalItem,
            start: TimelineSlots[range.StartIndex].Start,
            end: TimelineSlots[range.EndIndex].End);

        if (drag.Operation == GanttDragOperation.Move && drag.OriginalItem.Children is { Count: > 0 })
        {
            var originalStartIndex = GetSlotIndexForDate(drag.OriginalItem.Start);
            var appliedDeltaSlots = range.StartIndex - originalStartIndex;
            return ShiftItemTree(preview, appliedDeltaSlots);
        }

        return preview;
    }

    /// <summary>
    /// 获取任务开始槽索引
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private int GetItemStartIndex(GanttItem item) => GetSlotIndexForDate(item.Start);

    /// <summary>
    /// 获取任务结束槽索引
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private int GetItemEndIndex(GanttItem item) => GetSlotIndexForDate(item.End);

    /// <summary>
    /// 根据拖拽操作投影最终时间范围
    /// </summary>
    /// <param name="drag"></param>
    /// <param name="deltaSlots"></param>
    /// <returns></returns>
    private DragRange ProjectDragRange(DragState drag, int deltaSlots)
    {
        var constraints = GetItemConstraints(drag.OriginalItem);
        return drag.Operation switch
        {
            GanttDragOperation.ResizeStart => ProjectStartResizeRange(drag, deltaSlots, constraints),
            GanttDragOperation.ResizeEnd => ProjectEndResizeRange(drag, deltaSlots, constraints),
            _ => ProjectMoveRange(drag, deltaSlots, constraints)
        };
    }

    /// <summary>
    /// 投影整体移动后的时间范围
    /// </summary>
    /// <param name="drag"></param>
    /// <param name="deltaSlots"></param>
    /// <param name="constraints"></param>
    /// <returns></returns>
    private DragRange ProjectMoveRange(DragState drag, int deltaSlots, DragConstraint constraints)
    {
        var maxStartIndex = Math.Min(Math.Max(0, TimelineSlots.Count - drag.SpanUnits), constraints.MaxEndIndex - drag.SpanUnits + 1);
        var minStartIndex = Math.Max(0, constraints.MinStartIndex);
        var startIndex = Math.Clamp(drag.InitialStartIndex + deltaSlots, minStartIndex, Math.Max(minStartIndex, maxStartIndex));
        var endIndex = Math.Clamp(startIndex + drag.SpanUnits - 1, startIndex, TimelineSlots.Count - 1);
        return new DragRange(startIndex, endIndex);
    }

    /// <summary>
    /// 投影调整开始时间后的范围
    /// </summary>
    /// <param name="drag"></param>
    /// <param name="deltaSlots"></param>
    /// <param name="constraints"></param>
    /// <returns></returns>
    private DragRange ProjectStartResizeRange(DragState drag, int deltaSlots, DragConstraint constraints)
    {
        var currentEndIndex = drag.InitialEndIndex;
        var startIndex = Math.Clamp(drag.InitialStartIndex + deltaSlots, constraints.MinStartIndex, currentEndIndex);
        return new DragRange(startIndex, currentEndIndex);
    }

   /// <summary>
   /// 投影调整结束时间后的范围
   /// </summary>
   /// <param name="drag"></param>
   /// <param name="deltaSlots"></param>
   /// <param name="constraints"></param>
   /// <returns></returns>
    private DragRange ProjectEndResizeRange(DragState drag, int deltaSlots, DragConstraint constraints)
    {
        var currentStartIndex = drag.InitialStartIndex;
        var endIndex = Math.Clamp(drag.InitialEndIndex + deltaSlots, currentStartIndex, constraints.MaxEndIndex);
        return new DragRange(currentStartIndex, endIndex);
    }

    /// <summary>
    /// 获取任务可拖拽约束
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private DragConstraint GetItemConstraints(GanttItem item)
    {
        if (!EnforceConstraintChecks)
        {
            return new DragConstraint(0, Math.Max(0, TimelineSlots.Count - 1));
        }

        var itemId = GetResolvedItemId(item);
        var itemById = VisibleItems.ToDictionary(GetResolvedItemId, StringComparer.Ordinal);
        var minStartIndex = 0;
        var maxEndIndex = TimelineSlots.Count - 1;

        foreach (var dependencyId in item.Dependencies ?? Array.Empty<string>())
        {
            if (!itemById.TryGetValue(dependencyId, out var predecessor))
            {
                continue;
            }

            minStartIndex = Math.Max(minStartIndex, GetDependencyMinStartIndex(predecessor));
        }

        foreach (var successor in VisibleItems)
        {
            if (!(successor.Dependencies?.Contains(itemId) ?? false))
            {
                continue;
            }

            maxEndIndex = Math.Min(maxEndIndex, GetDependencyMaxEndIndex(successor));
        }

        ApplyResourceConstraints(item, ref minStartIndex, ref maxEndIndex);

        if (maxEndIndex < minStartIndex)
        {
            maxEndIndex = minStartIndex;
        }

        return new DragConstraint(minStartIndex, maxEndIndex);
    }

    /// <summary>
    /// 应用资源冲突相关约束
    /// </summary>
    /// <param name="item"></param>
    /// <param name="minStartIndex"></param>
    /// <param name="maxEndIndex"></param>
    private void ApplyResourceConstraints(
        GanttItem item,
        ref int minStartIndex,
        ref int maxEndIndex)
    {
        if (string.IsNullOrWhiteSpace(item.Owner))
        {
            return;
        }

        var itemId = GetResolvedItemId(item);
        var previousOwnerTask = default(GanttItem);
        var nextOwnerTask = default(GanttItem);

        foreach (var candidate in VisibleItems)
        {
            if (ReferenceEquals(candidate, item))
            {
                continue;
            }

            if (!string.Equals(candidate.Owner, item.Owner, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            var candidateId = GetResolvedItemId(candidate);
            if (candidateId == itemId)
            {
                continue;
            }

            if (candidate.End.Date < item.Start.Date)
            {
                if (previousOwnerTask is null || candidate.End.Date > previousOwnerTask.End.Date)
                {
                    previousOwnerTask = candidate;
                }

                continue;
            }

            if (candidate.Start.Date > item.End.Date)
            {
                if (nextOwnerTask is null || candidate.Start.Date < nextOwnerTask.Start.Date)
                {
                    nextOwnerTask = candidate;
                }
            }
        }

        if (previousOwnerTask is not null)
        {
            minStartIndex = Math.Max(minStartIndex, GetDependencyMinStartIndex(previousOwnerTask));
        }

        if (nextOwnerTask is not null)
        {
            maxEndIndex = Math.Min(maxEndIndex, GetDependencyMaxEndIndex(nextOwnerTask));
        }
    }

    /// <summary>
    /// 获取依赖约束下的最小开始索引
    /// </summary>
    /// <param name="predecessor"></param>
    /// <returns></returns>
    private int GetDependencyMinStartIndex(GanttItem predecessor) =>
        Math.Clamp(GetSlotIndexForDate(predecessor.End) + 1, 0, TimelineSlots.Count - 1);

    /// <summary>
    /// 获取依赖约束下的最大结束索引
    /// </summary>
    /// <param name="successor"></param>
    /// <returns></returns>
    private int GetDependencyMaxEndIndex(GanttItem successor) =>
        Math.Clamp(GetSlotIndexForDate(successor.Start) - 1, 0, TimelineSlots.Count - 1);

    /// <summary>
    /// 根据日期获取对应时间槽索引
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    private int GetSlotIndexForDate(DateTime date)
    {
        for (var index = 0; index < TimelineSlots.Count; index++)
        {
            var slot = TimelineSlots[index];
            if (date.Date >= slot.Start.Date && date.Date <= slot.End.Date)
            {
                return index;
            }
        }

        return TimelineSlots.Count - 1;
    }

    /// <summary>
    /// 构建父任务移动引起的子任务更新集合
    /// </summary>
    /// <param name="originalItem"></param>
    /// <param name="previewItem"></param>
    /// <returns></returns>
    private IReadOnlyList<GanttItemUpdate> BuildChildMoveUpdates(GanttItem originalItem, GanttItem previewItem)
    {
        if (originalItem.Children is not { Count: > 0 } || previewItem.Children is not { Count: > 0 })
        {
            return Array.Empty<GanttItemUpdate>();
        }

        var updates = new List<GanttItemUpdate>();
        AppendChildMoveUpdates(updates, originalItem.Children, previewItem.Children);
        return updates;
    }

    /// <summary>
    /// 递归追加子任务移动更新
    /// </summary>
    /// <param name="updates"></param>
    /// <param name="originalItems"></param>
    /// <param name="previewItems"></param>
    private void AppendChildMoveUpdates(List<GanttItemUpdate> updates, IReadOnlyList<GanttItem> originalItems, IReadOnlyList<GanttItem> previewItems)
    {
        var count = Math.Min(originalItems.Count, previewItems.Count);

        for (var index = 0; index < count; index++)
        {
            var originalChild = originalItems[index];
            var previewChild = previewItems[index];
            updates.Add(new GanttItemUpdate(
                GetResolvedItemId(originalChild),
                originalChild,
                previewChild,
                GanttDragOperation.Move));

            if (originalChild.Children is { Count: > 0 } && previewChild.Children is { Count: > 0 })
            {
                AppendChildMoveUpdates(updates, originalChild.Children, previewChild.Children);
            }
        }
    }

    /// <summary>
    /// 整体平移任务树
    /// </summary>
    /// <param name="item"></param>
    /// <param name="deltaSlots"></param>
    /// <returns></returns>
    private GanttItem ShiftItemTree(GanttItem item, int deltaSlots)
    {
        if (deltaSlots == 0)
        {
            return item;
        }

        var startIndex = Math.Clamp(GetSlotIndexForDate(item.Start) + deltaSlots, 0, TimelineSlots.Count - 1);
        var endIndex = Math.Clamp(GetSlotIndexForDate(item.End) + deltaSlots, startIndex, TimelineSlots.Count - 1);
        var shiftedChildren = item.Children?.Select(child => ShiftItemTree(child, deltaSlots)).ToArray();

        return CloneItem(
            item,
            start: TimelineSlots[startIndex].Start,
            end: TimelineSlots[endIndex].End,
            children: shiftedChildren);
    }
}
