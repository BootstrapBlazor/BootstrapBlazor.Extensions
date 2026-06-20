using System.Text;
using BootstrapBlazor.LLMsDocs.Cli;

// Ensure component docs (which are bilingual) print correctly regardless of the host code page.
try
{
    Console.OutputEncoding = Encoding.UTF8;
}
catch
{
    // Output is redirected and the encoding can't be set; ignore.
}

return await CommandFactory.Build().Parse(args).InvokeAsync();
