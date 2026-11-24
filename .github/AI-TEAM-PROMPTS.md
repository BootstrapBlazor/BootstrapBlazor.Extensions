# BootstrapBlazor.Extensions AI 协作提示词

按任务复制对应模板并填写方括号内容。仓库命令和任务入口见根协作规则。[AGENTS.md](../AGENTS.md)

## 扩展组件或服务开发

```text
在 [组件、扩展或中间件项目] 中实现 [功能或修复]。
使用场景为 [用户调用方式或复现步骤]，预期为 [可验证行为]。
保持 [参数、回调、服务注册、公开接口或目标框架兼容要求]。
检查 [Razor、JSInterop、静态资源、本地化、包内文档或示例] 中适用的部分。
按 [项目构建与相关测试] 验证，报告命令、结果和未执行的检查。
```

## 补充测试

```text
为 [项目] 的 [行为或回归] 补充测试，覆盖 [正常场景、边界和失败条件]。
沿用 [关联的 test 项目] 的测试框架和初始化方式，验证对外行为。
运行所涉及的测试项目，记录通过、失败或跳过的原因。
```

## 代码审查

```text
审查 [PR、提交范围或工作区差异]。
优先检查 [公开 API、框架兼容性、组件生命周期、JSInterop 或依赖打包]。
每个问题写明位置、触发条件、影响及建议，说明目前缺少的验证。
任务范围为 [仅报告或修复确认的问题]。
```

## 依赖更新

```text
按 update-dependency 技能更新 [dom2image、tableexport、driverjs 或 html2pdf]。
报告当前与目标依赖版本，以及受影响的项目、静态产物或目标框架。
交付范围为 [仅检查版本、准备改动或提交并创建 PR]。
```

[依赖布局](../docs/agents/dependencies.md) · [依赖更新技能](../.agents/skills/update-dependency/SKILL.md)

## Issue 或 Pull Request

```text
在 [目标仓库] 中按 github-issue-pr 技能执行 [建 Issue、发 PR 或关联现有资源]。
涉及组件为 [项目]，问题或改动为 [描述]，验收标准为 [结果]。
复现与验证为 [步骤和实际结果]，对应 Issue 为 [编号或无]。
目标分支为 [默认分支或指定分支]，授权范围为 [起草、提交、推送或创建资源]。
```

[GitHub Issue 和 PR 技能](../.agents/skills/github-issue-pr/SKILL.md) · [提交与 PR 指南](../docs/agents/pr-guide.md)
