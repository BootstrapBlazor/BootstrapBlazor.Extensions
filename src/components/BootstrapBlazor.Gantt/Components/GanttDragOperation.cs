namespace BootstrapBlazor.Gantt;

/// <summary>
/// 表示甘特图中的拖拽操作类型
/// </summary>
public enum GanttDragOperation
{
    /// <summary>
    /// 移动整个任务条
    /// </summary>
    Move = 0,

    /// <summary>
    /// 调整任务开始时间
    /// </summary>
    ResizeStart = 1,

    /// <summary>
    /// 调整任务结束时间
    /// </summary>
    ResizeEnd = 2,

   /// <summary>
   /// 调整任务完成度
   /// </summary>
    Progress = 3
}
