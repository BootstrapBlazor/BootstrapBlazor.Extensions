namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    /// <summary>
    /// 构建资源冲突状态文本
    /// </summary>
    /// <param name="conflicts"></param>
    /// <returns></returns>
    private static string BuildConflictStatus(ResourceConflictState conflicts)
    {
        var ownerPreview = conflicts.OwnerNames.Take(3);
        var suffix = conflicts.OwnerNames.Count > 3 ? $" 等另外 {conflicts.OwnerNames.Count - 3} 项" : string.Empty;
        return $"资源冲突：{string.Join("、", ownerPreview)}{suffix}";
    }

    /// <summary>
    /// 构建排程问题状态文本
    /// </summary>
    /// <param name="issues"></param>
    /// <returns></returns>
    private static string BuildScheduleIssueStatus(ScheduleIssueState issues)
    {
        var preview = issues.Messages.Take(2);
        var suffix = issues.Messages.Count > 2 ? $" 等另外 {issues.Messages.Count - 2} 项" : string.Empty;
        return $"排期异常：{string.Join(" | ", preview)}{suffix}";
    }

    /// <summary>
    /// 判断任务是否存在资源冲突
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private bool HasResourceConflict(GanttItem item) =>
        ResourceConflicts.ItemIds.Contains(GetResolvedItemId(item));

    /// <summary>
    /// 判断任务是否存在排程问题
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private bool HasScheduleIssue(GanttItem item) =>
        ScheduleIssues.ItemIds.Contains(GetResolvedItemId(item));

    /// <summary>
    /// 获取任务对应的排程问题消息
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private string? GetScheduleIssueMessage(GanttItem item)
    {
        var itemId = GetResolvedItemId(item);
        return ScheduleIssues.MessagesByItemId.TryGetValue(itemId, out var message)
            ? message
            : null;
    }

    /// <summary>
    /// 将可见任务转换为用于分析的渲染任务集合
    /// </summary>
    /// <param name="visibleItems"></param>
    /// <returns></returns>
    private IReadOnlyList<GanttItem> GetRenderedVisibleItems(IReadOnlyList<GanttItem> visibleItems) =>
        visibleItems
            .Select(GetRenderedItem)
            .ToArray();

    /// <summary>
    /// 构建资源冲突分析结果
    /// </summary>
    /// <param name="visibleItems"></param>
    /// <returns></returns>
    private ResourceConflictState BuildResourceConflictState(IReadOnlyList<GanttItem> visibleItems)
    {
        var renderedItems = GetRenderedVisibleItems(visibleItems)
            .Where(item => !string.IsNullOrWhiteSpace(item.Owner))
            .OrderBy(item => item.Start)
            .ToArray();

        if (renderedItems.Length == 0)
        {
            return ResourceConflictState.Empty;
        }

        var conflictingItemIds = new HashSet<string>(StringComparer.Ordinal);
        var conflictingOwners = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var ownerGroup in renderedItems.GroupBy(item => item.Owner!, StringComparer.OrdinalIgnoreCase))
        {
            var ownerItems = ownerGroup.OrderBy(item => item.Start).ToArray();

            for (var i = 0; i < ownerItems.Length; i++)
            {
                for (var j = i + 1; j < ownerItems.Length; j++)
                {
                    if (ownerItems[j].Start.Date > ownerItems[i].End.Date)
                    {
                        break;
                    }

                    if (!IsOverlapping(ownerItems[i], ownerItems[j]))
                    {
                        continue;
                    }

                    conflictingItemIds.Add(GetResolvedItemId(ownerItems[i]));
                    conflictingItemIds.Add(GetResolvedItemId(ownerItems[j]));
                    conflictingOwners.Add(ownerGroup.Key);
                }
            }
        }

        return new ResourceConflictState(conflictingItemIds, conflictingOwners.OrderBy(name => name).ToArray());
    }

   /// <summary>
   /// 判断两个任务是否存在时间重叠
   /// </summary>
   /// <param name="left"></param>
   /// <param name="right"></param>
   /// <returns></returns>
    private static bool IsOverlapping(GanttItem left, GanttItem right) =>
        left.Start.Date <= right.End.Date && right.Start.Date <= left.End.Date;

   /// <summary>
   /// 构建排程问题分析结果
   /// </summary>
   /// <param name="visibleItems"></param>
   /// <returns></returns>
    private ScheduleIssueState BuildScheduleIssueState(IReadOnlyList<GanttItem> visibleItems)
    {
        var renderedItems = GetRenderedVisibleItems(visibleItems);
        if (renderedItems.Count == 0)
        {
            return ScheduleIssueState.Empty;
        }

        var itemById = renderedItems.ToDictionary(GetResolvedItemId, StringComparer.Ordinal);
        var messagesByItemId = new Dictionary<string, string>(StringComparer.Ordinal);

        foreach (var item in renderedItems)
        {
            var itemId = GetResolvedItemId(item);
            var messages = new List<string>();

            if (!item.IsMilestone && item.End.Date < item.Start.Date)
            {
                messages.Add("结束时间早于开始时间");
            }

            foreach (var dependencyId in item.Dependencies ?? Array.Empty<string>())
            {
                if (!itemById.TryGetValue(dependencyId, out var predecessor))
                {
                    continue;
                }

                if (item.Start.Date <= predecessor.End.Date)
                {
                    messages.Add($"开始时间早于依赖任务“{predecessor.Name}”的结束时间");
                }
            }

            if (messages.Count > 0)
            {
                messagesByItemId[itemId] = string.Join("; ", messages.Distinct(StringComparer.Ordinal));
            }
        }

        if (messagesByItemId.Count == 0)
        {
            return ScheduleIssueState.Empty;
        }

        return new ScheduleIssueState(
            messagesByItemId.Keys.ToHashSet(StringComparer.Ordinal),
            messagesByItemId.Values.OrderBy(message => message).ToArray(),
            messagesByItemId);
    }

    /// <summary>
    /// 构建排程问题分析结果
    /// </summary>
    /// <param name="visibleItems"></param>
    /// <returns></returns>
    private CriticalPathState BuildCriticalPathState(IReadOnlyList<GanttItem> visibleItems)
    {
        var renderedItems = GetRenderedVisibleItems(visibleItems);
        if (!ShowCriticalPath || renderedItems.Count == 0)
        {
            return CriticalPathState.Empty;
        }

        var itemById = renderedItems.ToDictionary(GetResolvedItemId, StringComparer.Ordinal);
        var memo = new Dictionary<string, PathNode>(StringComparer.Ordinal);
        var visiting = new HashSet<string>(StringComparer.Ordinal);
        PathNode? best = null;

        foreach (var item in renderedItems)
        {
            var node = GetLongestPath(GetResolvedItemId(item));
            if (best is null || node.TotalDuration > best.TotalDuration)
            {
                best = node;
            }
        }

        if (best is null)
        {
            return CriticalPathState.Empty;
        }

        var itemIds = best.ItemIds.ToHashSet(StringComparer.Ordinal);
        var dependencyKeys = new HashSet<string>(StringComparer.Ordinal);

        for (var index = 1; index < best.ItemIds.Count; index++)
        {
            dependencyKeys.Add(BuildDependencyKey(best.ItemIds[index - 1], best.ItemIds[index]));
        }

        return new CriticalPathState(itemIds, dependencyKeys);

        PathNode GetLongestPath(string itemId)
        {
            if (memo.TryGetValue(itemId, out var cached))
            {
                return cached;
            }

            if (!itemById.TryGetValue(itemId, out var item))
            {
                return new PathNode(0, Array.Empty<string>());
            }

            if (!visiting.Add(itemId))
            {
                return new PathNode(GetItemDuration(item), new[] { itemId });
            }

            PathNode? bestDependencyPath = null;

            foreach (var dependencyId in item.Dependencies ?? Array.Empty<string>())
            {
                if (!itemById.ContainsKey(dependencyId))
                {
                    continue;
                }

                var dependencyPath = GetLongestPath(dependencyId);
                if (bestDependencyPath is null || dependencyPath.TotalDuration > bestDependencyPath.TotalDuration)
                {
                    bestDependencyPath = dependencyPath;
                }
            }

            visiting.Remove(itemId);

            var itemDuration = GetItemDuration(item);
            var result = bestDependencyPath is null
                ? new PathNode(itemDuration, new[] { itemId })
                : new PathNode(bestDependencyPath.TotalDuration + itemDuration,
                    bestDependencyPath.ItemIds.Concat(new[] { itemId }).ToArray());

            memo[itemId] = result;
            return result;
        }
    }

    /// <summary>
    /// 获取任务持续时长
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private static double GetItemDuration(GanttItem item) =>
        Math.Max(1d, (item.End.Date - item.Start.Date).Days + 1d);

    /// <summary>
    /// 构建依赖关系唯一键
    /// </summary>
    /// <param name="predecessorId"></param>
    /// <param name="successorId"></param>
    /// <returns></returns>
    private static string BuildDependencyKey(string predecessorId, string successorId) =>
        $"{predecessorId}->{successorId}";
}
