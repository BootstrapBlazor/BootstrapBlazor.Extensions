---
name: bb-review
description: Review BootstrapBlazor.Extensions changes using the repository's component, API, and packaging conventions. Use when explicitly invoked or when the entire prompt, after trimming whitespace, is review, 代码审查, or 审查代码.
---

# BootstrapBlazor.Extensions 快捷代码审查

遵守根目录 `AGENTS.md` 和 [组件自检清单](../../../docs/agents/component-checklist.md)。用户明确要求只报告或禁止修改时，遵守用户限制。

## 审查范围

- 核对当前分支、远端和目标分支，使用正确的合并基准比较改动；不要假定目标分支名。
- 检查完整的提交、暂存和未暂存差异，并读取相关未跟踪文件。
- 无法确定目标分支或比较基准时，先询问用户，不要自行切换分支。
- 只报告本次改动引入或暴露的问题，不扩展到无关的既有问题。

## 审查重点

- 检查公开 API 兼容性及源码项目支持的目标框架。
- 涉及组件时检查参数、回调、生命周期、本地化和服务注册；涉及 JSInterop 或静态资源时检查初始化、释放、加载路径及打包结果。
- 涉及依赖时核对实际引用版本、来源及组件登记信息。
- 问题应包含文件和行号、触发条件、影响及可执行建议；区分确定问题与需要确认的风险。

## 修复与报告

- 默认报告审查发现，不擅自扩大修改范围。用户明确要求修复，或修复授权已包含在任务中时，才对确定且局部的问题做最小修复，并按需运行相关验证。
- 报告审查基准与范围、按严重性排序的问题、未解决风险及实际执行的验证；未发现问题时明确说明。
- 如用户明确要求安全审查，遵循专门的安全审查流程。
