# 提交信息模板

常见标题为 `<type>(<scope>): <subject>`，其中 scope 用实际组件、工具或改动范围的名称。仓库也有省略 scope 的提交，改动集中在单个组件时优先写明组件名。

- `feat` 用于新增功能或按仓库惯例更新组件依赖。
- `fix` 用于修复缺陷。
- `doc` 用于文档改动，`test` 用于测试改动。
- `refactor` 用于不改变对外行为的重构，`chore` 用于其他维护改动。

```text
feat(Dom2Image): update SnapDOM to v3.8.3
fix(LLMsDocsGenerator): recognize BootstrapBlazor core repository
doc(Region): update documentation
```

标题写明可核对的结果。依赖更新用上游库的版本号，组件自身的发布版本放在对应项目配置中。需要说明原因、兼容性或验证时可补写正文，只添加适用的 trailer。[依赖更新技能](../../.agents/skills/update-dependency/SKILL.md) · [提交与 PR 指南](pr-guide.md)
