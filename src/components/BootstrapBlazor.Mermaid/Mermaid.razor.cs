using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;
/// <summary>
/// Mermaid组件
/// </summary>
public partial class Mermaid : IAsyncDisposable
{
    /// <summary>
    /// 获取/设置 图方向
    /// </summary>
    [Parameter]
    public MermaidDirection? Direction { get; set; } = MermaidDirection.TD;
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }
    private IJSObjectReference? Module { get; set; }
    /// <summary>
    /// 获取/设置 mermaid图内容
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }
    /// <summary>
    /// 获取/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }
    /// <summary>
    /// 自定义css
    /// </summary>
    [Parameter]
    public string? Style { get; set; } = string.Empty;
    /// <summary>
    /// 获取/设置 图Id
    /// </summary>
    [Parameter]
    public Guid? Id { set; get; } = Guid.NewGuid();
    /// <summary>
    /// 获取/设置 图类型
    /// </summary>
    [Parameter]
    public MermaidType? Type { set; get; } = MermaidType.None;
    /// <summary>
    /// 获取/设置 图标题 如果图类型是甘特图，饼图时和序列图时，可指定其title
    /// </summary>
    [Parameter]
    public string? MermaidTitle { set; get; } = string.Empty;
    /// <summary>
    /// 图类型
    /// </summary>
    public enum MermaidType
    {
        /// <summary>
        /// 不指定图类型，需要在ChildContent中显式指定
        /// </summary>
        None,
        /// <summary>
        /// 流程图
        /// </summary>
        flowchart,
        /// <summary>
        /// 序列图
        /// </summary>
        sequenceDiagram,
        /// <summary>
        /// 类图
        /// </summary>
        classDiagram,
        /// <summary>
        /// 状态图
        /// </summary>
        stateDiagram,
        /// <summary>
        /// 实体关系图
        /// </summary>
        erDiagram,
        /// <summary>
        /// 用户旅程图
        /// </summary>
        journey,
        /// <summary>
        /// 甘特图
        /// </summary>
        gantt,
        /// <summary>
        /// 饼图
        /// </summary>
        pie
    };
    /// <summary>
    /// 图方向,如果图类型是状态图和流程图时，需要指定图的方向
    /// </summary>
    public enum MermaidDirection
    {
        /// <summary>
        ///  从上到下（Top to Down）
        /// </summary>
        TD,
        /// <summary>
        ///  从上到下（Top to Bottom）与TD无差别
        /// </summary>
        TB,
        /// <summary>
        /// BT：从下到上（Bottom to Top）
        /// </summary>
        BT,
        /// <summary>
        /// LR：从左到右（Left to Right）
        /// </summary>
        LR,
        /// <summary>
        /// RL：从右到左（Right to Left)
        /// </summary>
        RL
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    protected override async Task OnInitializedAsync()
    {
        try
        {

            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "/js/mermaidHelper.js");
            await Module.InvokeVoidAsync("removeComment");
            await Module.InvokeVoidAsync("loadMermaidContent");

        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
        StateHasChanged();
        await base.OnInitializedAsync();
    }
    /// <summary>
    /// 导出图为base64字符串
    /// </summary>
    /// <returns>base64 string of the diagram</returns>
    public async Task<string> ExportBase64MermaidAsync()
    {
        return await Module!.InvokeAsync<string>("exportBase64Mermaid", this.Id);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public async ValueTask DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
    }
    
}

