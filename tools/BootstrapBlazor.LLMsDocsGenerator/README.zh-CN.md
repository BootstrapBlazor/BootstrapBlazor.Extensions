# BootstrapBlazor.LLMsDocsGenerator

[English](./README.md) | 简体中文

从工程的组件与服务源码生成适合 LLM 阅读的 API 文档。单工程生成只需要目标工程，不依赖同级的其他源码仓库。

## 环境要求

- 与工具工程目标框架匹配的 SDK（当前源码构建使用 .NET 11）。
- 目标工程的 `.csproj` 和源码文件。

## 安装

在本仓库根目录打包并安装工具：

```powershell
dotnet pack tools\BootstrapBlazor.LLMsDocsGenerator -c Release
dotnet tool install --global --add-source .\tools\BootstrapBlazor.LLMsDocsGenerator\bin\Release BootstrapBlazor.LLMsDocsGenerator
```

更新或卸载：

```powershell
dotnet tool update --global BootstrapBlazor.LLMsDocsGenerator
dotnet tool uninstall --global BootstrapBlazor.LLMsDocsGenerator
```

安装后的命令名为 `llms-docs`。

## 单工程用法

在目标工程目录运行：

```powershell
llms-docs --output ".\artifacts\llms"
```

也可以从其他目录指定工程：

```powershell
llms-docs --project ".\src\MyComponents\MyComponents.csproj" --output ".\artifacts\llms"
```

`--project` 也接受恰好包含一个 `.csproj` 的目录。

| 选项 | 说明 |
|------|------|
| `--project` | 目标工程文件或目录。省略时分析当前工作目录下的工程。 |
| `--output` | 输出目录，默认为当前工作目录，文档直接写入该目录。 |

直接运行 `llms-docs` 会分析当前工作目录下的工程，并将文档写入当前目录，不会向父目录、子目录或同级目录寻找其他工程。相对路径基于当前工作目录解析。生成错误或显式传入空路径时返回非零退出码。

## 输出

```text
<output>\
  llms.txt
  components\
    MyComponent.txt
    IExampleService.txt
    ServiceCollectionExtensions.txt
```

`llms.txt` 使用相对链接索引工程中的组件与服务，每个类型各自生成一份 Markdown 文档，供 Agent 按需读取：

- 参数、类型、默认值及说明
- 事件回调与公开方法
- 泛型参数与基类
- 可识别的服务注册方法
- 仓库可识别时的源码链接

文档优先提取双语 XML 注释中的中文，无中文时使用已有文本。支持只有组件、只有服务或只有服务注册扩展的工程；未找到可识别的类型时生成失败。类型名称冲突可能覆盖文件时也会报错。

输出目录不存在时自动创建，不会清空已有内容；仅清理带有生成器标记的过期 `.txt` 文档，保留无标记文件及子目录。

## 分析范围与限制

分析器使用 Roslyn 扫描工程源码，提取 `[Parameter]` 属性、事件回调、公开方法和 XML 注释，并收录本地可解析的继承成员。服务从公开、非过时的顶层类型中发现：`Services` 目录下的接口、以 `Service` 或 `Provider` 结尾的接口，以及以 `Service` 或 `Provider` 结尾的非静态类。

同时收录公开、非过时的顶层静态类中，针对 `IServiceCollection` 的公开、非过时 `Add*` 或 `TryAdd*` 扩展方法。只提取这些注册方法，保留源码签名中的 `this` 接收参数、泛型参数及约束、可选参数默认值。注册扩展在索引中单独分组，不会作为可注入服务展示。由于不加载依赖元数据，接收参数类型按名称匹配；外部服务接口、实现及配置类型不会复制到输出中。

这是源码分析，不是完整的 MSBuild 或 Razor 编译：

- 外部基类成员与服务接口可能未收录。
- Razor 仅合成继承声明，不提取 `@code` 中的成员。
- 支持工程中显式声明的 `<Using Include="..." />`，包括别名和静态导入。
- 不处理条件、属性展开、导入的 `.props`/`.targets` 及 `Using Remove`。

索引中会提示源码分析的限制。生成器只产出参考文档，不创建或安装 skill。

## 验证

在本仓库根目录构建，并使用 PowerShell 7 执行集成检查：

```powershell
dotnet build .\tools\BootstrapBlazor.LLMsDocsGenerator -c Release
.\tools\BootstrapBlazor.LLMsDocsGenerator\tests\Verify-SingleProject.ps1
```
