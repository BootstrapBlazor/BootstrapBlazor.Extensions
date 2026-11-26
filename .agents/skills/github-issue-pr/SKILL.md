---
name: github-issue-pr
description: >-
  按 BootstrapBlazor.Extensions 的仓库约定创建、复用或更新 GitHub Issue 和 Pull Request。
  适用于只建 Issue、只发 PR、同时创建 Issue 和 PR，以及关联或更新已有资源。
---

# GitHub Issue 和 Pull Request

## 操作规则

- 开始 GitHub 写操作前，核对当前分支和目标仓库默认分支。当前分支若为默认分支，立即提示用户并停止。
- 不执行编译或单元测试；不新建、切换分支或 worktree。
- 未指定操作或资源编号时，只根据当前分支相对默认分支的更改创建或复用一个 Issue，再创建或复用基于当前分支的 PR 并关联 Issue。没有可发布差异时停止。
- 只操作用户指定的 Issue/PR；若请求同时创建 Issue 和 PR，先处理 Issue，再处理 PR。除非用户明确要求，不合并 PR。
- 有歧义或缺少必要信息、授权时先询问；否则依据仓库现有内容继续。

## 仓库与分支

目标仓库默认为 `BootstrapBlazor/BootstrapBlazor.Extensions`，用户指定时以用户指定仓库为准。用 `git remote -v` 核对 `origin`，用以下命令确认仓库和默认分支：

```powershell
gh repo view $targetRepo --json nameWithOwner,defaultBranchRef
```

使用默认分支作为 PR base。检查 `git status --short --branch`、`git branch -vv`、暂存区和工作区差异；比较默认分支与当前分支，确保 Issue 和 PR 只涵盖本次相关更改。保留无关改动，不重置、stash、改写历史或强推；无法安全隔离时停止并说明原因。

只使用当前分支及其同名远端分支。远端分支不存在时停止，不推送以创建新分支；远端有分歧时仅在可快进的情况下更新。需要提交时仅提交本次改动，并复核提交和 PR 差异。

## Issue

新建前按标题关键词和组件查找打开 Issue；明确匹配时优先复用。根据任务选择 `.github/ISSUE_TEMPLATE` 中的表单，使用其标题、必填字段和适用标签。缺少表单要求的事实时先查现有材料，仍缺失再询问。

创建 Issue 时使用简洁标题和正文，并核对标签是否存在。正文写入 UTF-8 临时文件后通过 `gh issue create --repo $targetRepo --title "$issueTitle" --body-file "$issueBodyFile"` 创建。编辑时保留原正文，只修改请求涉及的字段。

## Pull Request 与关联

按目标仓库、base、head 仓库和当前分支查找并核对现有 PR；匹配时复用，否则基于当前分支创建。新 PR 正文必须遵循 `.github/pull_request_template.md`，保留章节和清单，并在 `Summary By Copilot` 概述实际差异。未执行的验证不得勾选；说明按本流程未运行编译和单元测试。

只有在 PR 解决 Issue 且符合关闭意图时，在 `## Link issues` 使用 `fixes #<number>`；否则使用 `Refs #<number>`。同时创建 Issue 和 PR 时务必在 PR 中关联新建或复用的 Issue。跨仓库引用使用 `owner/repo#<number>`。更新已有 PR 时只改请求字段并保留其他内容和引用。

## 验证与交付

创建或更新后重新读取资源，核对状态、标题、链接和正文；PR 还需核对 base、head、提交、文件及 Issue 关联。操作结果不明确时先查询 GitHub，确认未成功后最多重试一次，避免重复创建。返回 Issue 和 PR 链接，并说明未完成或无法核实的事项。
