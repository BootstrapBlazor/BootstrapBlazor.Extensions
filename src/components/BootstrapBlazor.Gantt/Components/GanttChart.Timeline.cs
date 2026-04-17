namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
   /// <summary>
   /// 计算时间轴轨道总像素宽度
   /// </summary>
   /// <returns></returns>
    private double GetTrackPixelWidth() =>
        (GetTimelineSlotCount() * MinColumnWidth) + (Math.Max(0, GetTimelineSlotCount() - 1) * CellGapPx);

    /// <summary>
    /// 获取当前时间槽数量
    /// </summary>
    /// <returns></returns>
    private int GetTimelineSlotCount() =>
        computingState ? timelineSlotsCache.Count : TimelineSlots.Count;

    /// <summary>
    /// 获取单个时间槽的步进宽度
    /// </summary>
    /// <returns></returns>
    private double GetSlotStepWidth() => MinColumnWidth + CellGapPx;

    /// <summary>
    /// 将指定时间规范到当前视图模式的槽起点
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private DateTime NormalizeToSlotStart(DateTime value) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => value.AddDays(-((7 + (int)value.DayOfWeek - (int)DayOfWeek.Monday) % 7)).Date,
            GanttViewMode.Month => new DateTime(value.Year, value.Month, 1),
            _ => value.Date
        };

    /// <summary>
    /// 将指定时间规范到当前视图模式的槽终点
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private DateTime NormalizeToSlotEnd(DateTime value) =>
        GetSlotEnd(NormalizeToSlotStart(value));

    /// <summary>
    /// 获取下一个时间槽的起点
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private DateTime GetNextSlot(DateTime value) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => value.AddDays(7),
            GanttViewMode.Month => value.AddMonths(1),
            _ => value.AddDays(1)
        };

    /// <summary>
    /// 获取当前时间槽的终点
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private DateTime GetSlotEnd(DateTime value) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => value.AddDays(6),
            GanttViewMode.Month => new DateTime(value.Year, value.Month, DateTime.DaysInMonth(value.Year, value.Month)),
            _ => value
        };

    /// <summary>
    /// 构建时间槽主标签
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private string BuildSlotLabel(DateTime value) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => $"第 {System.Globalization.ISOWeek.GetWeekOfYear(value):00} 周",
            GanttViewMode.Month => value.ToString("yyyy 年 MM 月"),
            _ => value.ToString("MM/dd")
        };

    /// <summary>
    /// 构建时间槽辅助标题
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private string BuildSlotCaption(DateTime value) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => $"{value:MM/dd} 至 {value.AddDays(6):MM/dd}",
            GanttViewMode.Month => $"{DateTime.DaysInMonth(value.Year, value.Month)} 天",
            _ => value.ToString("ddd", System.Globalization.CultureInfo.GetCultureInfo("zh-CN"))
        };

    /// <summary>
    /// 计算两个时间点之间的总单位数
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    /// <returns></returns>
    private double GetTotalUnits(DateTime start, DateTime end) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => Math.Max(1, ((NormalizeToSlotStart(end) - NormalizeToSlotStart(start)).Days / 7) + 1),
            GanttViewMode.Month => Math.Max(1, ((end.Year - start.Year) * 12) + end.Month - start.Month + 1),
            _ => Math.Max(1, (end.Date - start.Date).Days + 1)
        };

    /// <summary>
    /// 计算指定时间相对范围起点的偏移单位数
    /// </summary>
    /// <param name="rangeStart"></param>
    /// <param name="value"></param>
    /// <returns></returns>
    private double GetOffsetUnits(DateTime rangeStart, DateTime value) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => (NormalizeToSlotStart(value) - rangeStart).Days / 7d,
            GanttViewMode.Month => ((value.Year - rangeStart.Year) * 12d) + value.Month - rangeStart.Month,
            _ => (value.Date - rangeStart.Date).Days
        };

    /// <summary>
    /// 计算任务跨越的时间单位数
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    private double GetSpanUnits(GanttItem item) =>
        ResolvedViewMode switch
        {
            GanttViewMode.Week => Math.Max(1, ((NormalizeToSlotStart(item.End.Date) - NormalizeToSlotStart(item.Start.Date)).Days / 7d) + 1),
            GanttViewMode.Month => Math.Max(1, ((item.End.Year - item.Start.Year) * 12d) + item.End.Month - item.Start.Month + 1),
            _ => Math.Max(1, (item.End.Date - item.Start.Date).Days + 1)
        };
}
