
using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor;

public partial class ScriptCheck
{
    [Parameter, EditorRequired]
    public string Input { get; set; } = string.Empty;
    private string Output { get; set; }

    [Parameter, EditorRequired]
    public string Script { get; set; }
    [Parameter, EditorRequired]
    public EventCallback<string> ScriptChanged { get; set; }
    private async Task Change(string script)
    {
        Script = script;
        if (ScriptChanged.HasDelegate)
            await ScriptChanged.InvokeAsync(script);
    }

    [Parameter]
    public Func<string, string, Task<string>> GetResult { get; set; }

    private async Task CheckScript()
    {
        try
        {
            if (GetResult != null)
            {
                Output = await GetResult(Input, Script).ConfigureAwait(false);
            }
        }
        catch (Exception ex)
        {
            Output = ex.ToString();
        }
    }

    private async Task GetDemo(Microsoft.AspNetCore.Components.Web.MouseEventArgs args)
    {
        Script = OnGetDemo?.Invoke();
        await Change(Script);
    }
    CodeEditor CodeEditor;
    private  async Task Insert()
    {
       await CodeEditor.InsertTextAsync("test1");
    }
    [Parameter, EditorRequired]
    public Func<string> OnGetDemo { get; set; }
}
