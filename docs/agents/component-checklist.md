# 组件、服务与资源自检

## 公开契约

- 核对项目边界。Razor 组件检查 `[Parameter]`、默认值、回调及生命周期，服务包检查公开接口、DI 注册方法和生命周期，中间件检查注册入口和请求行为。保留已有调用方式和所支持框架的行为。[DriverJs 组件](../../src/components/BootstrapBlazor.DriverJs/Components/DriverJs.razor.cs) · [Dom2Image 注册](../../src/components/BootstrapBlazor.Dom2Image/Extensions/ServiceCollectionExtensions.cs) · [中间件入口](../../src/middleware/BootstrapBlazor.Middleware/BootstrapBlazorApplicationBuilderExtensions.cs)
- XML 注释遵循 [BB 组件规范](https://github.com/dotnetcore/BootstrapBlazor/blob/main/docs/agents/component-checklist.md#参数与-api)。新增 API 时标记其所属扩展包计划发布的正式版本；修改已有 API 时保留其引入版本。

## 浏览器资源与本地化

- 核对 `_content/<包名>/` 路径、Razor 模块入口、JS 导出和 CSS 加载。涉及互操作时检查初始化、更新和释放，在适用宿主上验证相关交互。[DriverJs Razor](../../src/components/BootstrapBlazor.DriverJs/Components/DriverJs.razor) · [DriverJs 模块](../../src/components/BootstrapBlazor.DriverJs/Components/DriverJs.razor.js)
- 已使用 `IStringLocalizer` 的组件沿用本地化机制，同步相应 `Locales` 资源并核对项目文件中的嵌入设置。样式修改核对组件使用的主题和第三方资源。[DriverJs 资源](../../src/components/BootstrapBlazor.DriverJs/Locales/) · [DriverJs 项目](../../src/components/BootstrapBlazor.DriverJs/BootstrapBlazor.DriverJs.csproj)

## 文档、打包与验证

- 使用方式变化时更新适用的包内 skill、文档或示例。新增项目时核对它在解决方案中的归属。涉及发布时检查项目元数据、静态资源和适用的打包配置。[解决方案](../../BootstrapBlazor.Extensions.slnx) · [包内技能打包目标](../../src/PackageSkills.targets) · [发布工作流](../../.github/workflows/release.yml)
- 构建改动涉及的项目，检查相关目标框架。已有测试可覆盖行为或回归时，选用对应测试项目。需要验证可见行为时提供适用的示例宿主或最小复现，并记录实际结果。[仓库命令](../../AGENTS.md) · [复现指南](../repro.md)
