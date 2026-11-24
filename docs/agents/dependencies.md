# 依赖布局与版本约定

## .NET 项目

- 包源在 `NuGet.Config`，当前配置包含 `nuget.org`。`src/Directory.Build.props` 导入框架列表，并定义默认组件包版本和 `BBVersion`。项目通常通过 `<PackageReference Include="BootstrapBlazor" Version="$(BBVersion)" />` 引用 BB。[NuGet 配置](../../NuGet.Config) · [源码共享属性](../../src/Directory.Build.props) · [DriverJs 项目](../../src/components/BootstrapBlazor.DriverJs/BootstrapBlazor.DriverJs.csproj)
- 第三方依赖查所属项目的 `PackageReference` 和条件 `ItemGroup`。TableExport 和 Html2Pdf 在各自项目中使用共享版本属性，同时为部分旧框架指定固定版本。评估变更时检查相关框架实际采用的引用，并区分依赖版本与组件发布包的 `<Version>`。[TableExport 项目](../../src/components/BootstrapBlazor.TableExport/BootstrapBlazor.TableExport.csproj) · [Html2Pdf 项目](../../src/components/BootstrapBlazor.Html2Pdf/BootstrapBlazor.Html2Pdf.csproj)
- 测试 SDK、xUnit 和覆盖率收集器由测试目录共享配置。bUnit 等测试专用引用按项目声明。[测试共享属性](../../test/Directory.Build.props) · [Editor 测试项目](../../test/UnitTestEditor/UnitTestEditor.csproj)

## 前端资源

- Razor 类库将浏览器资源放在项目的 `wwwroot/` 或组件相邻的 `.razor.js` 等文件中。第三方发布产物与本仓库维护的 JSInterop 封装职责不同，改动前通过模块导入和组件加载路径确认影响范围。[DriverJs 模块](../../src/components/BootstrapBlazor.DriverJs/Components/DriverJs.razor.js) · [Dom2Image 模块](../../src/components/BootstrapBlazor.Dom2Image/wwwroot/dom2image.js)
- CodeEditor 有独立的 `package.json`、`package-lock.json` 和 Monaco 构建脚本。依赖声明、锁文件和静态产物的位置按该项目配置核对。[包配置](../../src/components/BootstrapBlazor.CodeEditor/package.json) · [锁文件](../../src/components/BootstrapBlazor.CodeEditor/package-lock.json) · [构建脚本](../../src/components/BootstrapBlazor.CodeEditor/scripts/build-monaco.mjs)

已登记组件的版本查询、发布产物提取、替换、验证和 PR 流程见对应技能。选择版本或新增依赖时，说明使用范围、目标框架兼容性和打包影响。[update-dependency](../../.agents/skills/update-dependency/SKILL.md)
