# BootstrapBlazor.Extensions Copilot 指引

开始任务前读取根目录规则，再按其中的索引查阅与任务有关的文档。[AGENTS.md](../AGENTS.md)

- 起草 GitHub PR 正文时，在 `Summary By Copilot` 下概述实际差异。保留模板的章节和清单，按实际完成情况记录验证。[PR 模板](pull_request_template.md)
- 审查变更时，指出文件、行号、触发条件和影响。涉及提交、推送或更新 GitHub 资源时，遵循对应仓库技能。[GitHub Issue 和 PR](../.agents/skills/github-issue-pr/SKILL.md)
- Copilot CLI 的 `/bb-review` 调用仓库快捷审查流程，`/review` 调用 CLI 内置审查；其他客户端按 [快捷代码审查流程](../.agents/skills/bb-review/SKILL.md) 执行。
- 任务完成后，若运行环境提供可靠的起止时间，报告从收到任务到完成的墙钟耗时（格式：`耗时：N 秒`）；否则不估算。