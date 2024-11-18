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
    /// 
    /// </summary>
    /// <returns></returns>
    protected override async Task OnInitializedAsync()
    {
        Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.Mermaid/Mermaid.razor.js");
        await Module.InvokeVoidAsync("removeComment");
        await Module.InvokeVoidAsync("loadMermaidContent");


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

