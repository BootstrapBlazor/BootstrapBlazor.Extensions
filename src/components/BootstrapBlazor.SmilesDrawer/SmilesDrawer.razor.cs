using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// SmilesDrawer 组件
/// </summary>
public partial class SmilesDrawer
{
    /// <summary>
    /// 获得/设置描述分子结构的 Smiles 字符串
    /// </summary>
    [Parameter]
    [EditorRequired]
    [NotNull]
    public string? SmilesValue { get; set; }

    /// <summary>
    /// 是否开启紧凑绘图，默认为false不开启
    /// </summary>
    [Parameter]
    public bool CompactDrawing { get; set; }

    private string? ClassString => CssBuilder.Default("bb-smiles-drawer")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

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
            StoreParameters();
        }
        else if (ValidateParameters())
        {
            await InvokeVoidAsync("update", Id, GetOptions());
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, GetOptions());

    private object GetOptions() => new { SmilesValue, NeedReLoadOptions, CompactDrawing };

    private string? _lastSmilesValue;

    private bool _lastCompactDrawing;

    private bool NeedReLoadOptions { get; set; }

    private void StoreParameters()
    {
        _lastSmilesValue = SmilesValue;
        _lastCompactDrawing = CompactDrawing;
    }

    private bool ValidateParameters()
    {
        var changed = false;
        if (_lastSmilesValue != SmilesValue)
        {
            _lastSmilesValue = SmilesValue;
            changed = true;
        }
        else if (_lastCompactDrawing != CompactDrawing)
        {
            _lastCompactDrawing = CompactDrawing;
            changed = true;
        }
        NeedReLoadOptions = changed;
        return changed;
    }

}

