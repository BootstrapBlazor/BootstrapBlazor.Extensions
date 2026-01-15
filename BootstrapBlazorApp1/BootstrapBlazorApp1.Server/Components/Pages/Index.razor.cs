using BootstrapBlazor;
using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Components;

namespace BootstrapBlazorApp1.Server.Components.Pages
{
    public partial class Index
    {

        private async Task OnShowInsertClick()
        {


            var op = new DialogOption()
            {
                IsScrolling = false,
                ShowMaximizeButton = true,
                Size = Size.ExtraLarge,
                Title = "test",
                ShowFooter = false,
                ShowCloseButton = false,
                Component = BootstrapDynamicComponent.CreateComponent<ScriptCheck>(new Dictionary<string, object?>
    {
        {nameof(ScriptCheck.Script),"script" },
        {nameof(ScriptCheck.GetResult), async (string input,string script)=>
        {
            return "script";
        }},

        {nameof(ScriptCheck.OnGetDemo),()=>
                {
                    return """
                                Tag("dev1","var1").Value.ToInt() + 100
                                """;

                }
            },

         {nameof(ScriptCheck.ScriptChanged),EventCallback.Factory.Create<string>(this, a =>
        {

        }) }

        }),
            };
            //op.BodyTemplate = renderFragment;
            await DialogService.Show(op);

        }
        [Inject]
        DialogService DialogService { get; set; }
    }
}
