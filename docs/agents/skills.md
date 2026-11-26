# 仓库级 Agent Skills

配置 AI agent 的 skill 目录，或需要让某个工具使用本仓库的 skill 前必须读取本文件，并遵守根 [AGENTS.md](../../AGENTS.md)。

## 唯一来源

仓库级技能统一保存在 `.agents/skills/<skill-name>/SKILL.md`，每个技能只维护一份：

- `bb-review`：按 Extensions 组件和 API 约定执行快捷代码审查。[bb-review](../../.agents/skills/bb-review/SKILL.md)
- `github-issue-pr`：按仓库流程创建、查重、复用或更新 GitHub Issue / PR。[github-issue-pr](../../.agents/skills/github-issue-pr/SKILL.md)
- `update-dependency`：按登记的组件参数更新 npm 内嵌产物或 NuGet 包。[update-dependency](../../.agents/skills/update-dependency/SKILL.md) · [依赖布局](dependencies.md)

## 各工具接入方式

### 加载项目规则

- Codex 和 Cursor 支持根目录的 `AGENTS.md`。[Codex 指南](https://developers.openai.com/codex/guides/agents-md) · [Cursor 指南](https://cursor.com/docs/rules#agentsmd)
- GitHub Copilot 从仓库级入口 [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) 获取项目规则；各客户端对 `AGENTS.md` 的支持情况见 [Copilot 自定义指令说明](https://docs.github.com/en/copilot/reference/custom-instructions-support)。
- Gemini CLI 默认加载 `GEMINI.md`。如需读取 `AGENTS.md`，可在 `.gemini/settings.json` 的 `context.fileName` 中添加该文件；已有设置时只合并该字段。[Gemini CLI 指南](https://geminicli.com/docs/cli/gemini-md/)
- Claude Code 可直接加载 `AGENTS.md`；需要兼容旧版或保留已有 `CLAUDE.md` 时，可在其中引用 `@AGENTS.md`。[Claude Code 指南](https://code.claude.com/docs/en/memory#agents-md)

### 发现仓库级技能

- Codex、Cursor、Gemini CLI 和支持 Agent Skills 的 GitHub Copilot 客户端可发现 `.agents/skills/`。[Codex 指南](https://developers.openai.com/codex/skills) · [Cursor 指南](https://cursor.com/docs/skills) · [Gemini CLI 指南](https://geminicli.com/docs/cli/skills/) · [Copilot 指南](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- Copilot CLI 的 `/bb-review` 调用本仓库快捷审查，`/review` 调用内置审查流程。
- Claude Code 可按根 `AGENTS.md` 的指引直接读取仓库里的 `SKILL.md`。如需斜杠调用，可复制到用户级 `~/.claude/skills/`；不要在仓库中维护副本。[Claude Code Skills 指南](https://code.claude.com/docs/en/skills)

## 约束

- 不要在 `.github/skills/`、`.claude/skills/` 等目录复制第二份 `SKILL.md`，避免内容漂移。
- 保留 `.gitignore` 对个人工具目录 `.claude` 的忽略规则。
- 不要用软链共享 skill。Git 的 `core.symlinks` 为 `false` 时，软链会被检出为普通文本文件。
- `.github/agents/*.agent.md` 是 Copilot 自定义 agent，与 Agent Skills 不同；除非任务需要，不要将其作为技能迁移。
- 需要 `gh` 的技能依赖 GitHub CLI、已登录的 GitHub 账号和网络；不可用时按对应 `SKILL.md` 的降级说明处理。

## 随 NuGet 包发布的 API 参考

带 `<SkillName>` 的源码项目在项目目录的 `skills/<SkillName>/` 维护面向使用者的入口。打包目标用 `llms-docs` 从当前工程生成 `references/` 并收入 NuGet 包。查询组件参数、回调、服务注册或公开方法时，选择项目实际还原版本对应的参考资料，并通过源码核对未收录成员。[DriverJs 包内入口](../../src/components/BootstrapBlazor.DriverJs/skills/bb-driverjs/SKILL.md) · [打包目标](../../src/PackageSkills.targets) · [工具清单](../../dotnet-tools.json)
