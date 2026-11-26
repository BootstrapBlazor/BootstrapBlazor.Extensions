# BootstrapBlazor.Extensions 协作规则

## 项目与命令

- 解决方案为 [BootstrapBlazor.Extensions.slnx](BootstrapBlazor.Extensions.slnx)。`src/components/` 按包组织 Razor 组件和服务，`src/extensions/` 包含数据访问、OPC、SignalR 等扩展，`src/middleware/` 包含服务端中间件。`test/` 按项目组织测试，例如 `UnitTestEditor`、`UnitTestHoliday` 和 `UnitTestSvgIcon`。
- 从仓库根目录运行命令。CI 通过 `actions/setup-dotnet` 读取 `global.json`，按该文件选择 .NET 11 SDK。源码项目默认面向 `net6.0` 至 `net11.0`，测试和工具使用 `net11.0`。查看具体项目的引用及条件编译时，以项目文件和导入的配置为准。[SDK 配置](global.json) · [源码框架](src/Frameworks.props) · [测试配置](test/Directory.Build.props) · [单目标框架](Framework.props) · [工具配置](tools/Directory.Build.props)
- 本地构建整个解决方案用 `dotnet build BootstrapBlazor.Extensions.slnx`。按改动范围构建单个项目，例如 `dotnet build src/components/BootstrapBlazor.DriverJs`，需要聚焦某个框架时可加 `-f net11.0`。
- 推送到 `master`、`main` 或 `dev` 时，`Build` 步骤当前没有命令，`Test` 步骤执行下列两条命令。以这三个分支为目标的 PR 工作流另执行 `dotnet test test/UnitTestEditor`。[推送工作流](.github/workflows/build.yml) · [PR 工作流](.github/workflows/auto-pull-request-checks.yml)

```text
dotnet test ./test/UnitTestEditor --collect:"XPlat Code Coverage"
dotnet test ./test/UnitTestHoliday --collect:"XPlat Code Coverage"
```

## 编码规范

- **术语**。BootstrapBlazor 组件库简称 BB，BootstrapBlazor 组件简称 BB 组件，BootstrapBlazor.Extensions 简称 BB.Extensions。
- **C#**。遵循 `.editorconfig` 和相邻文件的风格，优先使用文件范围命名空间，添加源文件时沿用文件头。源码启用可空引用类型和隐式 `using`。处理无效输入或已释放状态时可用早期返回，新增异步方法优先用 `Async` 后缀，保留已有公开签名和接口约定。[编辑器配置](.editorconfig) · [共享构建属性](Directory.Build.props)
- **Razor**。沿用同一组件的 `.razor` 和 `.razor.cs` 分工，保留现有的参数、回调和生命周期约定。内联 `@code` 的组件将其放在标记之后。浏览器交互沿用组件已有的异步 JSInterop 入口，核对静态资源加载路径和初始化、释放时机。[组件自检](docs/agents/component-checklist.md)

## AI 约束

- 修改前阅读目标项目、相关源码和相近实现，复用现有能力，保留用户的已有改动和公开 API 行为。
- 涉及参数、事件、服务注册或依赖时，以实际引用的版本、源码和生成的 API 文档为准。证据缺失时说明缺口，按任务范围处理。[依赖说明](docs/agents/dependencies.md) · [仓库技能](docs/agents/skills.md)
- 提交、推送以及操作 Issue / PR 时遵循用户授权与仓库流程。合并 PR 需要用户明确要求。[提交与 PR 指南](docs/agents/pr-guide.md)
- 协作说明使用简体中文，命令、标识符与技术术语保留原写法。报告实际执行的验证及结果，并说明未执行的适用检查。

## 测试约定

- 按改动所对应的测试项目运行 `dotnet test <项目路径>`。公共测试配置使用 xUnit 和 `coverlet.collector`，`UnitTestEditor` 和 `UnitTestRegion` 的组件测试使用 bUnit。行为变更优先覆盖对外契约、边界和具体回归。[测试配置](test/Directory.Build.props) · [Editor 测试项目](test/UnitTestEditor/UnitTestEditor.csproj) · [Region 测试项目](test/UnitTestRegion/UnitTestRegion.csproj)
- `UnitTestSvgIcon` 包含解包及生成 Razor、SVG 文件的用例，运行前核对输出位置和任务范围。当前 CI 的测试步骤运行 .NET 测试，CodeEditor 的 npm 脚本用于构建 Monaco 静态资源。涉及 JavaScript 时，按改动核对模块加载和相关交互，必要时使用适用的 Blazor 宿主或最小复现。[图标测试源码](test/UnitTestSvgIcon/UnitTest.cs) · [CodeEditor 脚本配置](src/components/BootstrapBlazor.CodeEditor/package.json) · [复现指南](docs/repro.md)

## 参考文档（按需读取）

- 排查依赖来源或版本约定时读 [依赖说明](docs/agents/dependencies.md)，按已登记组件更新依赖时读 [update-dependency](.agents/skills/update-dependency/SKILL.md)。
- 准备提交或 PR 时读 [提交与 PR 指南](docs/agents/pr-guide.md) 和 [提交信息模板](docs/agents/commit_msg_template.md)。创建、复用或更新 GitHub Issue / PR 时读 [github-issue-pr](.agents/skills/github-issue-pr/SKILL.md)。
- 用户提示去除首尾空白后恰为 `review`、`代码审查` 或 `审查代码` 时，按 [快捷代码审查流程](.agents/skills/bb-review/SKILL.md) 执行。
- 修改组件、服务、静态资源或打包行为时读 [组件自检](docs/agents/component-checklist.md)。
- 接入仓库技能或查询发布包的 API 参考时读 [仓库技能](docs/agents/skills.md)。编写协作任务时可参考 [AI 协作提示词](.github/AI-TEAM-PROMPTS.md)。
