# 提交与 PR 指南

## 准备改动

- 用 `git status --short --branch`、`git diff` 和 `git diff --cached` 核对分支及变更。提交范围以当前任务为准，保留已有工作区和暂存区内容。[提交信息模板](commit_msg_template.md)
- 用 `git remote -v` 核对仓库。GitHub 目标通常为 `BootstrapBlazor/BootstrapBlazor.Extensions`，base 以目标仓库的默认分支或用户指定的分支为准。分支准备、提交、推送和远端核验按仓库技能执行。[GitHub Issue 和 PR](../../.agents/skills/github-issue-pr/SKILL.md)

## Issue 与 PR

- 按任务选择仓库的 Issue 表单，先检查已有条目。缺陷应写明受影响组件、框架、复现步骤和预期行为，按需要附最小复现。[Issue 表单](../../.github/ISSUE_TEMPLATE/) · [复现指南](../repro.md)
- PR 正文保留 `Link issues`、`Summary By Copilot`、回归、风险、验证、打包与自检章节。是否关联或关闭 Issue 由任务意图决定，无对应 Issue 时按技能填 `N/A`。[PR 模板](../../.github/pull_request_template.md) · [Issue 与 PR 关联流程](../../.agents/skills/github-issue-pr/SKILL.md)
- 按实际差异说明修改内容、适用验证及其结果。手工验证未执行时保留相应复选框为空。涉及打包、文档或使用示例时核对模板中的相应条目。[组件自检](component-checklist.md)
- 准备合并时核对目标分支上适用的检查和审查结果。PR 工作流当前运行 `UnitTestEditor`，其他验证按改动范围补充。AI 合并 PR 需要用户明确要求。[PR 工作流](../../.github/workflows/auto-pull-request-checks.yml)
