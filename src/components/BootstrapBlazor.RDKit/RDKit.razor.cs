
using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// RDKit 组件
/// </summary>
public partial class RDKit
{
    /// <summary>
    /// 获得/设置 RDKit 值
    /// </summary>
    [Parameter]
    [EditorRequired]
    [NotNull]
    public string? Value { get; set; }

    private string? ClassString => CssBuilder.Default("bb-rdk")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? _lastValue;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _lastValue = Value;
        }
        else if (_lastValue != Value)
        {
            _lastValue = Value;
            await InvokeVoidAsync("update", Id, Value);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Value);
}
