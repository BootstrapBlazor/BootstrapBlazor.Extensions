# 仓库技能与包内技能

## 维护仓库时使用的技能

仓库级技能保存在 `.agents/skills/<skill-name>/SKILL.md`。支持发现该目录的工具可按技能名称调用，其他工具可以从根协作规则打开同一份 `SKILL.md`。[AGENTS.md](../../AGENTS.md)

- `github-issue-pr` 用于创建、查重、复用或更新 GitHub Issue / PR，以及按用户请求关联两者。实际操作使用已认证的 `gh` 并核对目标仓库。[github-issue-pr](../../.agents/skills/github-issue-pr/SKILL.md)
- `update-dependency` 用于按已登记参数更新 npm 内嵌产物或 NuGet 包，执行组件构建并按需进入 PR 流程。[update-dependency](../../.agents/skills/update-dependency/SKILL.md) · [依赖布局](dependencies.md)
- GitHub Copilot 的仓库级入口是 `.github/copilot-instructions.md`，通用约定由它指向根规则。[Copilot 指引](../../.github/copilot-instructions.md)

## 随 NuGet 包发布的 API 参考

带 `<SkillName>` 的源码项目在项目目录的 `skills/<SkillName>/` 维护面向使用者的入口。打包目标用 `llms-docs` 从当前工程生成 `references/` 并收入 NuGet 包。查询组件参数、回调、服务注册或公开方法时，选择项目实际还原版本对应的参考资料，并通过源码核对未收录成员。[DriverJs 包内入口](../../src/components/BootstrapBlazor.DriverJs/skills/bb-driverjs/SKILL.md) · [打包目标](../../src/PackageSkills.targets) · [工具清单](../../dotnet-tools.json)
