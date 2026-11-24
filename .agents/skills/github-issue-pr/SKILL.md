---
name: github-issue-pr
description: >-
  按 BootstrapBlazor.Extensions 的仓库约定创建、复用或更新 GitHub Issue 和 Pull Request。
  适用于只建 Issue、只发 PR、提交并发 PR、同时建 Issue 和 PR，以及仅关联已有 PR 和 Issue。
---

# GitHub Issue 和 Pull Request

## 确定本次操作

- **只建 Issue**时，查重后创建或复用 Issue。
- **只发 PR 或提交并发 PR**时，按请求准备、提交或推送改动，再创建或复用 PR。已有远端分支且内容符合请求时，直接使用该分支。指定了 Issue 时，核对后按请求关联。
- **同时建 Issue 和 PR**时，先确认远端 PR 分支可用且提交和差异符合请求，再创建或复用 Issue，随后创建或更新 PR 并关联。
- **仅关联已有 PR 和 Issue**时，根据编号或链接核对双方，直接执行关联步骤。涉及编辑正文时，仅修改对应的引用或关闭关键词。
- 用户要求更新已有资源时，只传入需要修改的字段。现有资源已满足请求时，复用并返回。合并 PR 需要用户明确要求。

## 核对仓库和文案

用 `git remote -v` 核对 GitHub 的 `origin`。默认目标为 `BootstrapBlazor/BootstrapBlazor.Extensions`，用户指定目标时以明确指定的仓库为准。命令中的 `$targetRepo` 为目标仓库的 `owner/repo`。用户给出完整链接时，先核对链接中的仓库和资源类型，再以该仓库和编号执行命令。

```powershell
gh repo view $targetRepo --json nameWithOwner,defaultBranchRef
```

PR 的 base 默认使用返回的 `defaultBranchRef.name`，本仓库当前为 `master`。用户指定其他 base 时，核对该分支存在。GitHub 命令通过 `--repo`、仓库位置参数或 API 路径指明仓库。

参考 `git log --oneline -20` 和相关组件近期的 Issue、PR。提交和 PR 的标题通常用 `<type>(<scope>): <description>`，scope 用项目或组件名。近期提交常见 `feat`、`fix`、`chore`。缺陷 Issue 用 `bug`，对应修复提交和 PR 通常用 `fix`。提交仅添加适用的 trailer。Issue 和 PR 文案默认用简洁英文，用户指定语言时按其要求。用已认证的 `gh`，将正文写入系统临时目录中的 UTF-8 文件，通过 `--body-file` 传入。

## 准备 PR 分支

1. 用 `git status --short --branch`、`git branch -vv`、`git diff --cached` 和 `git diff` 核对当前分支、upstream、暂存区和工作区。确定实际的 head 仓库、分支和提交。用 `git remote get-url --push --all "$headRemote"` 核对推送地址，选定对应 head 仓库的 `$headPushUrl`。
2. 从目标仓库对应的 `$baseRemote` 获取准确的 `$baseBranch`。fetch 成功后立即保存 `FETCH_HEAD` 的提交号。将 `$headCommit` 设为准备发布的提交号，比较两侧独有提交和 PR 的三点差异。若 head 在远端且缺少对应的本地提交对象，先获取该分支。
   ```powershell
   git fetch --no-tags "$baseRemote" "refs/heads/$baseBranch"
   if ($LASTEXITCODE -ne 0) { throw '获取 base 分支失败' }
   $baseCommit = git rev-parse --verify FETCH_HEAD
   if ($LASTEXITCODE -ne 0) { throw '无法读取 base 提交' }
   git log --oneline --left-right "${baseCommit}...${headCommit}"
   git diff --name-status "${baseCommit}...${headCommit}"
   git diff "${baseCommit}...${headCommit}"
   ```
3. 同一 head 分支曾有 PR 合并时，对照已合并 PR 的差异和当前 base 内容，识别 squash merge 已纳入的改动。若发现无关提交或重复改动，从正确的 base 建立独立分支或 worktree，只带入本次改动。用户指定必须使用某分支而无法安全准备时，说明具体冲突。保留用户的其他改动及暂存内容，避免重置、stash、改写历史或强推。
4. 需要提交时，按暂存状态处理。
   - 暂存区中的改动都属于本次任务时，只暂存本次需要的文件或片段，复查完整的 `git diff --cached` 后提交。
   - 无关暂存改动都在其他路径，且目标路径已跟踪、整个文件的改动都属于本次任务时，用 `git diff HEAD -- <paths>` 核对后执行 `git commit --only -m "<message>" -- <paths>`。这里提交的是所列路径的工作区内容。
   - 需要按片段提交含无关暂存内容的文件，或需提交新文件且要保留原暂存区时，在独立 worktree 应用并核对本次改动，再提交。
5. 推送前更新 `$headCommit`，重新核对提交和差异。用 `git ls-remote --exit-code "$headPushUrl" "refs/heads/$headBranch"` 核对远端 head。提交号一致时直接使用。退出码为 `2` 表示没有匹配的远端引用，其他查询错误先诊断连接或权限。如果远端分支存在且提交号不同，按需获取远端提交，再用 `git merge-base --is-ancestor $remoteHeadCommit $headCommit` 确认可以快进。确认可推送后执行以下命令，并重新核对远端提交号。
   ```powershell
   git push "$headPushUrl" "${headCommit}:refs/heads/$headBranch"
   ```

## 创建、复用或更新 Issue

用户指定 Issue 时，核对仓库、状态和正文。需要新建时，按组件、标题关键词和症状搜索。优先复用目标组件和所述问题明确一致的打开条目。已关闭条目用于了解历史。用户明确指定已关闭的 Issue 时，核对其状态是否满足用途。

```powershell
gh issue list --repo $targetRepo --state open --search $keywords --json number,title,state,url
gh issue list --repo $targetRepo --state all --search $keywords --json number,title,state,url
gh issue view $issueNumber --repo $targetRepo --json number,url,state,title,body,labels,assignees,createdAt
```

按任务选择对应表单，按 `<type>(<scope>): <description>` 填写标题。缺陷使用 `bug` 和标签 `bug`，功能使用 `feat` 和标签 `enhancement`，文档使用 `doc` 和标签 `documentation`，测试使用 `test` 和标签 `test`，其他维护使用 `chore` 和标签 `chore`。仓库中的 `60_config.yml` 写有模板选择页的配置内容，GitHub 要求该配置文件名为 `config.yml`。参见 [Issue 表单](../../../.github/ISSUE_TEMPLATE)。

- 按 YAML 的字段标题和必填设置编写 Markdown 正文。缺陷表单要求查重确认、缺陷描述、预期行为、交互渲染模式、复现步骤和 .NET 版本。必要信息缺失时，先从现有材料核实，再向用户索取仍缺少的事实。复现步骤附上可访问的最小复现工程，优先采用公开 GitHub 仓库或公开在线环境。参见[复现指南](../../../docs/repro.md)。
- 创建时用 `--title`、`--body-file` 和 `--label` 提交整理后的内容和标签。这个模式由调用方填写表单字段和元数据。`gh issue create --template` 与 `--body-file` 互斥。五份表单都指定了默认负责人，仓库可指派名单中的登录名为 `ArgoZhang`。需要沿用默认指派时，显式传入 `--assignee ArgoZhang`，并以实际可指派名单为准。
- 用 `gh label list --repo $targetRepo --limit 100 --json name` 核对标签。标签存在时使用对应名称。找不到时省略该标签并说明。

```powershell
gh issue create --repo $targetRepo --title "$issueTitle" --label "$issueLabel" --body-file "$issueBodyFile"
```

编辑时先读取现有内容，按请求选择 `--title`、`--body-file` 等选项。以下示例更新正文。把局部改动合并进当前完整正文后写回，保留其他内容。

```powershell
gh issue edit $issueNumber --repo $targetRepo --body-file "$issueBodyFile"
```

## 创建、复用或更新 PR

创建前按目标仓库、base、head 所有者和 head 分支查找打开的 PR。下面的 `$headOwner` 是实际 head 仓库的所有者。再逐一核对结果的 `headRepository` 是否为实际 head 仓库的完整 `owner/repo`。

```powershell
gh api --hostname github.com --method GET --paginate "repos/$targetRepo/pulls" -f state=open -f "head=${headOwner}:$headBranch" -f "base=$baseBranch" --jq '.[] | {number, url: .html_url, headRepository: .head.repo.full_name, headBranch: .head.ref, baseBranch: .base.ref}'
```

复用列表中的候选 PR 时，要求目标仓库、base 分支、head 仓库和 head 分支全部匹配，用下方 `gh pr view` 返回的 `headRepository.nameWithOwner` 和 `headRefOid` 核对来源及实际提交。用户直接指定 PR 时，将编号和所属仓库分别填入 `$prNumber` 和 `$targetRepo`，用下方 `gh pr view` 按编号核对状态、内容和归属。该命令可读取打开、已关闭和已合并的 PR。现有 PR 需要更新正文时，基于读取的完整正文增量编辑，保留其他引用和章节。

```powershell
gh pr view $prNumber --repo $targetRepo --json number,url,state,title,body,baseRefName,headRefName,headRepository,headRefOid,files,commits,closingIssuesReferences
gh pr edit $prNumber --repo $targetRepo --body-file "$prBodyFile"
```

新建 PR 时，按模板起草正文，保留章节和复选框。摘要以实际 PR 差异为准，按事实填写回归、风险、验证、打包和自检。手工验证未执行时，保留对应复选框未勾选并如实说明。参见 [PR 模板](../../../.github/pull_request_template.md)。

```powershell
gh pr create --repo $targetRepo --base "$baseBranch" --head "$headSpec" --title "$prTitle" --body-file "$prBodyFile"
```

同仓库的 `$headSpec` 为分支名，个人 fork 为 `<owner>:<branch>`。显式传入 `--head` 时，CLI 跳过自动 fork 和推送，所以应先核对远端 head。组织 fork 使用 GitHub 的创建 PR 页面，明确选择 head 仓库和分支。

## 关联 Issue 和 PR

- PR 解决 Issue、base 为默认分支且符合用户的关闭意图时，在 `## Link issues` 写 `fixes #<number>`。跨仓库用 `fixes owner/repo#<number>`。合并到默认分支后 GitHub 会关闭关联的 Issue。
- 仅引用时写 `Refs #<number>`，跨仓库写 `Refs owner/repo#<number>`。请求建立正式关联且关闭关键词不适用时，在有写权限的 GitHub `Development` 区域手动关联。同仓库可以从 PR 或 Issue 操作，跨仓库从 Issue 侧操作。操作前核对关联的关闭行为与用户意图一致。
- 新建 PR 无对应 Issue 时，在 `## Link issues` 中将模板的占位行 `fixes #{issue number}` 替换为 `N/A`。编辑已有 PR 时保留其他有效关联。

## 验证与失败重试

- 创建或更新后重读对应资源，核对链接、状态和请求涉及的字段。PR 还要核对 base、head 仓库、分支、提交和文件列表。关闭关联用 `gh pr view` 的 `closingIssuesReferences` 核对 Issue 的仓库和编号，手动关联在 `Development` 核验，仅引用则核对正文。
- 提交或推送失败且结果不明确时，先核对本地最新提交或远端 head，确认本次改动是否已经提交或推送，再决定如何继续。
- 创建失败、超时或响应不明确时，先确认远端结果。Issue 除关键词搜索外，执行 `gh issue list --repo $targetRepo --state all --limit 100 --json number,title,state,body,createdAt,url` 检查最近条目，按原始标题、正文和请求时间核对，避免只依赖搜索索引。列表不足以覆盖该时间段时，扩大查询范围。PR 用前面的 REST 查询，将 `state=open` 换为 `state=all`，按实际 head 仓库、分支、base 和提交核对，同步检查已关闭或合并的条目。
- 已找到本次创建的资源时复用其编号，核对标题、正文和标签等请求项，并只补缺失项。编辑或关联失败时，重读资源，已生效就直接验证，仍缺失则以最新内容重试。确认首次请求未创建资源、失败原因已解除时，最多重试一次创建。若查询结果无法排除重复，保留现有状态并说明。
- 返回请求范围内的 Issue 或 PR 链接，以及尚未完成或无法核实的事项。
