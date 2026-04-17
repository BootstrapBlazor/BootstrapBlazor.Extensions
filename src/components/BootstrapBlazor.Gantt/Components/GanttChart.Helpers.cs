namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    /// <summary>
    /// 基于指定任务创建一个可选字段覆盖的副本
    /// </summary>
    /// <param name="source"></param>
    /// <param name="name"></param>
    /// <param name="start"></param>
    /// <param name="end"></param>
    /// <param name="color"></param>
    /// <param name="owner"></param>
    /// <param name="progress"></param>
    /// <param name="isMilestone"></param>
    /// <param name="isSummary"></param>
    /// <param name="id"></param>
    /// <param name="dependencies"></param>
    /// <param name="cssClass"></param>
    /// <param name="children"></param>
    /// <returns></returns>
    private static GanttItem CloneItem(
        GanttItem source,
        string? name = null,
        DateTime? start = null,
        DateTime? end = null,
        string? color = null,
        string? owner = null,
        double? progress = null,
        bool? isMilestone = null,
        bool? isSummary = null,
        string? id = null,
        IReadOnlyList<string>? dependencies = null,
        string? cssClass = null,
        IReadOnlyList<GanttItem>? children = null)
    {
        return new GanttItem(source)
        {
            Name = name ?? source.Name,
            Start = start ?? source.Start,
            End = end ?? source.End,
            Color = color ?? source.Color,
            Owner = owner ?? source.Owner,
            Progress = progress ?? source.Progress,
            IsMilestone = isMilestone ?? source.IsMilestone,
            IsSummary = isSummary ?? source.IsSummary,
            Id = id ?? source.Id,
            Dependencies = dependencies ?? source.Dependencies,
            CssClass = cssClass ?? source.CssClass,
            Children = children ?? source.Children
        };
    }

    /// <summary>
    /// 比较两个任务对象的值是否等价
    /// </summary>
    /// <param name="left"></param>
    /// <param name="right"></param>
    /// <returns></returns>
    private static bool AreItemsEquivalent(GanttItem? left, GanttItem? right)
    {
        if (ReferenceEquals(left, right))
        {
            return true;
        }

        if (left is null || right is null)
        {
            return false;
        }

        if (!string.Equals(left.Name, right.Name, StringComparison.Ordinal) ||
            left.Start != right.Start ||
            left.End != right.End ||
            !string.Equals(left.Color, right.Color, StringComparison.Ordinal) ||
            !string.Equals(left.Owner, right.Owner, StringComparison.Ordinal) ||
            left.Progress != right.Progress ||
            left.IsMilestone != right.IsMilestone ||
            left.IsSummary != right.IsSummary ||
            !string.Equals(left.Id, right.Id, StringComparison.Ordinal) ||
            !string.Equals(left.CssClass, right.CssClass, StringComparison.Ordinal))
        {
            return false;
        }

        if (!AreStringListsEquivalent(left.Dependencies, right.Dependencies))
        {
            return false;
        }

        if (left.Children is null || right.Children is null)
        {
            return left.Children is null && right.Children is null;
        }

        if (left.Children.Count != right.Children.Count)
        {
            return false;
        }

        for (var index = 0; index < left.Children.Count; index++)
        {
            if (!AreItemsEquivalent(left.Children[index], right.Children[index]))
            {
                return false;
            }
        }

        return true;
    }

    /// <summary>
    /// 比较两个字符串列表是否按顺序完全一致
    /// </summary>
    /// <param name="left"></param>
    /// <param name="right"></param>
    /// <returns></returns>
    private static bool AreStringListsEquivalent(IReadOnlyList<string>? left, IReadOnlyList<string>? right)
    {
        if (ReferenceEquals(left, right))
        {
            return true;
        }

        if (left is null || right is null)
        {
            return left is null && right is null;
        }

        if (left.Count != right.Count)
        {
            return false;
        }

        for (var index = 0; index < left.Count; index++)
        {
            if (!string.Equals(left[index], right[index], StringComparison.Ordinal))
            {
                return false;
            }
        }

        return true;
    }
}
