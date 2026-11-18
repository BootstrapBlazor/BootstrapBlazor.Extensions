# DockView 5.x → 8.x 升级说明（改动清单 / 特殊处理 / 正确性复核）

> 一句话：内核从 `dockview 5.1.0` 升到 `dockview-core 8.9.0`，**不再对内核打任何补丁**（
> `grep -c "bb-" dockview-core.esm.js` = 0），原先「删 clamp / 改最小尺寸 / 加 className / 改
> pointer 坐标 / 改 overlay 事件载荷」那一整套 5.1.0 私有补丁全部退役，改为用官方公开 API、
> 公开模块契约和外挂模块实现；同时把 5.x 时代自研的**抽屉（aside/drawer）**、**标签溢出下拉**、
> **手写复制的浮窗几何**全部删除，交给官方实现，再按本项目的交互需求补差异。

---

## 0. 改动面

| 文件 | 增 | 删 | 说明 |
|---|---:|---:|---|
| `wwwroot/js/dockview-core.esm.js` | 20335 | 11361 | 内核整体替换为 8.9.0 官方构建（含新版模块系统与 10 个内置模块） |
| `wwwroot/css/dockview.css` | 4349 | 1309 | 同步替换为 8.9.0 官方主题产物（CSS 变量化、新主题） |
| `wwwroot/css/dockview-bb.css` | 211 | 93 | 本项目样式：删抽屉/aside/下拉菜单，加浮窗手柄、边条、peek 浮层、分隔线抑制 |
| `wwwroot/js/dockview-autohide.js` | 394 | 0 | **新增**：自研 Auto-Hide Edge Group 模块（peek 工具窗交互） |
| `wwwroot/js/dockview-group.js` | 353 | 241 | 钉起改用 Edge Group；浮窗几何全面改走 `Overlay`；抽屉逻辑删除 |
| `wwwroot/js/dockview-utils.js` | 80 | 113 | 浮窗视口护栏、first-visible 标记、隐藏 sash 同步、扩容器收口 |
| `wwwroot/js/dockview-extensions.js` | 72 | 27 | `setVisible` 只维护 first-visible；`removeGroup` 补 edge 分支；新增 `syncHiddenSash` |
| `wwwroot/js/dockview-panel.js` | 23 | 16 | 关面板时记录几何的取值来源修正（外壳/边条区分） |
| `wwwroot/js/dockview-config.js` | 28 | 0 | 布局清理补 `edgeGroups`（孤儿视图 / 删面板） |
| `wwwroot/js/dockview-icon.js` | 1 | 1 | 内置图标去掉 `dropdown` |

> `Directory.Build.props`（本机临时去 net11.0）与 `docs/` 未跟踪，不属本次改动。

---

## 1. 新增 / 封装 / 升级了哪些功能

### 1.1 钉起：自研抽屉 → 官方 Edge Group

5.x 是「把组搬进一个满是 hack 的浮窗（`floatType:'drawer'`）+ 在容器外层插 `<aside>` 竖排按钮」，
刷新、缩放、关闭都要手工同步。8.x 改为官方 **Edge Group**（布局内的边缘组）：

| 能力 | 用的官方 API |
|---|---|
| 建边条（初始尺寸/最小尺寸/收起尺寸/自动隐藏） | `addEdgeGroup(position, { id, initialSize, minimumSize, collapsedSize, autoHide })` |
| 收起 / 展开 / 状态 | `edgeGroup.api.collapse()/expand()/isCollapsed()`、`onDidCollapsedChange` |
| 收起时 tab 竖排、展开回顶部 | `group.api.setHeaderPosition(position \| 'top')` |
| 尺寸持久化 | `group.api.setSize({width\|height})`（随 `toJSON` 落盘 `edgeGroups[position].size`） |
| 边条查询/摘除 | `getEdgeGroup(position)` / `removeEdgeGroup(position)` |
| 面板搬运 | `moveGroupOrPanel({ from, to, keepEmptyGroups })` |

本项目在官方语义上补的两层：

1. **来源追踪**：搬面板时给 `panel.params.edgeOrigin` 记下原网格组 id；取消钉起时按来源分组
   逐个搬回**原占位组**（`dockview.setVisible(group,false)` 留的隐藏空占位），占位没了才
   `addGroup({direction})` 兜底新建（VS 的「按钉起时的分组取消」语义）。
2. **选边**：`getEdgeSide()` 用中心点法（组中心落在结构区左半 → 左）；浮窗先 `dock()` 回网格
   再钉，但选边取的是浮窗**当前**位置（回仓后位置不代表用户意图）。

### 1.2 新增：Auto-Hide Edge Group（peek 浮层）

官方把「收起条点 tab 滑出预览」放在 enterprise 包里，本项目按官方 `moduleContracts`
（`IAutoHideEdgeGroupHost/Service`）语义**自研**了一个模块（`dockview-autohide.js`）：

- `defineModule({ name:'AutoHideEdgeGroup', serviceKey:'autoHideEdgeGroupService' })` + `registerModules`；
- 收起条点 tab → 把该组的 `.dv-content-container` reparent 进浮层，**覆盖**内容、网格零重排；
  再点同 tab / 点外部 / Esc / 窗口尺寸变化 → 收回（`createDismissableLayer`）；
- 浮层标题栏：title（跟随激活面板）+ pin（展开停靠，= `setEdgeGroupCollapsed(false)`）+ close
  （尊重 `panel.params.showClose`）；
- 内边缘自建拖拽把手调宽/调高，松手 `setSize()` 写回边条并落盘；
- 拖拽期间用 `host.setEdgeGroupPeeking(group,true)` 让官方状态机（`isPeeking`、z-index）跟上；
- `renderer:'always'` 的面板不随 reparent 走，用 `host.repositionPanelOverlay(panel, visible, rect)` 锚定；
- 无障碍：`host.announce()` 播报滑出/收回。

对应的宿主能力全部是官方公开契约：`getEdgeGroupPanel / setEdgeGroupCollapsed / isEdgeGroupAutoHide /
onDidEdgeGroupAutoHideChange / getEdgeGroupExpandedSize / setEdgeGroupPeeking / repositionPanelOverlay /
overlayRoot / announce`。

### 1.3 浮窗：几何全部改走 `Overlay`

- 统一入口：`floatingShell(group) = group.element.closest('.dv-resize-container')`、
  `floatingOverlay(group)`、`floatingSize(group)`，所有尺寸/位置读写只认外壳的
  `style.width/height` 与 `overlay.setBounds()`；
- 收起/展开不再手算 `bottom`（旧代码 `bottom ± (height - tabHeight)`），改
  `overlay.setBounds({height})`，由核心做 top/bottom 锚定归一化；
- 最大化/还原改 `overlay.setBounds({left,top,width,height})`，还原时按 `rect.position` 逐键回填；
- **尺寸下限**：核心的 `Overlay.MINIMUM_WIDTH/HEIGHT=20` 是私有常量、且我们把
  `minimumInViewport*` 设成负值（允许越过容器），所以自己按面板语义兜：宽度 ≥ 200（100 装不下
  标题栏那排操作按钮）、高度 ≥ 标题栏（`collapsedHeight()`，含 titlebar 模式的 22px 拖动条）；
  在 `overlay.onDidChange` 里实时夹，附 `clamping` 标志防重入；
- **高度语义双向归一**（容差 `FLOAT_HEIGHT_SLACK=12`）：收起态被拖高 → 展开；展开态被压到
  标题栏 → 自动按 down 的整套状态收起（`packup` + 图标 `bb-up` + 内容 `bb-overflowHidden`），
  残余像素抹平到标题栏；再次展开还原「最近一次稳定展开高度」（`WeakMap`，不能用拖动中的瞬时值）；
- **拖拽护栏**：允许拖出当前 dockview（本项目是嵌套 dockview），但不许整窗出浏览器视口 ——
  `floatingGroupBounds` 取负值放开容器方向，视口方向用公开钩子
  `transformFloatingGroupDrag` 按「宿主 rect → 视口坐标」夹 `{left, top}`。

### 1.4 删除的功能（被官方实现取代）

| 删除 | 原因 |
|---|---|
| `floatType:'drawer'`、`createDrawerHandle/createDrawerBtn/removeDrawerBtn/setDrawerTitle` | 抽屉由 Edge Group 取代 |
| `<aside class="bb-dockview-aside">` 竖排按钮及 `--bb-dockview-aside-*` 变量、`padding-left/right` 占位 | 同上 |
| 自研标签溢出下拉（`observeGroup` + `ResizeObserver` + `setWidth`/`resizeObserverHandle` 把 tab 搬进 `dropdown-menu`） | 8.x 内核自带 overflow list，`disableTabsOverflowList` 选项一并删除 |
| `dropdown` 图标、`--bb-dockview-control-dropdown-*` 变量 | 同上 |
| `setVisible` 里的 z-index/sash z-index 干预 | 线由 CSS `::before` 与 `first-visible` 解决，不再干预绘制 |

### 1.5 布局与渲染细节

- **隐藏占位列的分隔线**：`markFirstVisibleElement()` 给「容器内第一个可见 `.dv-view`」打
  `first-visible`（只对 `.dv-view-container` 生效，边条组等非 splitview 视图直接跳过）；CSS 只归零三处：
  隐藏视图自身、`first-child:not(.visible) + .visible`、`.first-visible`。横排（列布局）补了 `width:0`
  的镜像规则（竖排早有 `height:0`，横排漏了）。
- **隐藏边界的 sash 不可拖**：`syncHiddenSash()` 逐条 sash 判断「缝是否同时对上某可见视图的右边界与
  左边界」，不满足 → `bb-sash-locked`（`pointer-events:none`）。**不能按“隐藏组边界”整体锁**：
  会误锁左右两个可见面板之间那条合法缝。
- **序列化清理**：`pruneOrphanViews` / `_removePanelIdsFromLayout` 增加 `edgeGroups` 分支
  （空组删除、孤儿视图剔除、删面板后清空则删边条）。
- **浮窗位置恢复交给内核**：`postLayoutInit` 不再手工回写 `style.inset`。存档里的 `position` 由
  `deserializeFloatingWindows` → `addFloatingGroup` → `getAnchoredBox()` 还原（含锚定边），
  且 `setBounds` 有 `hasLayout` 早退（rect 0×0 时不反写位置）。详见 §2.15。
- **最大化时隐藏 down**：最大化状态下 down 会让窗口缩到标题栏，而 `rect.isMaximized` 仍是 `true`、
  图标停在"还原"，状态自相矛盾。CSS 在 `.dv-right-actions-container.bb-maximize` 下隐藏
  `.bb-dockview-control-icon-down`（与 full/restore 的互换规则同一组），探针 `probe-icon-disabled` 守这条。
- **关面板时的几何记录**：从浮窗关 → 取外壳 `offsetWidth/Height + offsetTop/Left`（8.x 的
  `parentElement` 是内层 `.dv-view`，`offsetTop/Left` 恒 0）；从边条关 → **不记**位置并显式删掉
  浅拷里可能残留的旧 `currentPosition`（否则会在「边条与原占位组都已销毁」时按旧浮窗几何还原），
  只保留 `edgeOrigin` 以便回原占位组。

---

## 2. 为适配 8.x 做的特殊处理（现象 → 原因 → 处理）

### 2.1 `group.element.parentElement` 不再是浮窗外壳

8.x 浮窗结构：`groupview ← .dv-view ← .dv-view-container ← .dv-split-view-container ← … ←
.dv-grid-view ← .dv-resize-container`。旧代码写 `parentElement.style.*` 会落到内层 `.dv-view`，
现象是「窗口不动、组被挤到窗口右下角、左上留白」。→ 全部改 `floatingShell()`/`overlay.setBounds()`。

### 2.2 浮窗尺寸每最大化/还原一次涨 2px

旧代码 `rect.width = group.width + 2`（补 5.x 的 1px 边框×2），8.x 外壳 `border:none`。
→ `floatingSize()` 直接读外壳 `style.width/height`，读写同源。

### 2.3 `_rootDropTarget` → `_rootDropTargetService`

8.x 把 root drop target 收进模块注册表，构造项改名。→ 订阅改
`dockview._rootDropTargetService?.onDrop(...)`（可选链，模块被裁掉时静默）。

### 2.4 `fromJSON` 是同步执行的

`initDockviewFromConfig` 里 `fromJSON` 同步跑完时，`onDidLayoutFromJSON` 已经 fire 过。
→ `first-visible` 必须**先直接补一遍**，再订阅事件接住「运行时再次 fromJSON」。

### 2.5 浮窗八向手柄只有顶部能拖

核心手柄 `z-index: var(--dv-overlay-z-index)`，而容器上这条变量是自引用（`--x: var(--x,999)`）
按规范失效 → 手柄退化为 `z-index:auto`，被后绘制的 `.dv-view` 盖住；顶部之所以还能拖，是因为那条缝
压在非定位的 `.dv-floating-titlebar` 上。→ 8 个手柄显式 `z-index:10`（只抬高，不改几何）。
> 另：浮窗内 `renderer:'always'` 面板会从容器**外**再盖一层，与本条成因不同，见 §4 第 6 条（未修）。

### 2.6 图标被误判为「禁用（浅灰）」

抽屉时代有一批 `:has(.dv-resize-container)` / `:has(.bb-show-pin)` 的推断规则；8.x 浮窗 overlay 挂在
网格内部、嵌套 dockview 又在内容容器里，`:has()` 会命中网格组与祖先组。→ 全删，灰化只由 `.bb-lock` 触发。

### 2.7 钉起后原位置留一条竖线

真正来源是 `.dv-view::before`（每条非首个视图的 1px 前导线），隐藏占位列宽 0 也会画。
竖排早有 `height:0`、横排漏了 `width:0`。→ 补 CSS 镜像规则 + `first-visible` 标记
（禁止用 `+ .dv-view` 相邻近似：会把「隐藏中间面板后两侧之间那条线」一起删掉）。

### 2.8 隐藏占位列留下「鬼影 sash」

隐藏视图的 sash 坐标算错（实测落在 `left=0`），拖它会给 0 宽空列分配尺寸。→ 逐条判断合法性并打
`bb-sash-locked`；`sashes` 为空时用 `group.element.parentElement.parentElement` 兜底找容器，
否则「取消钉起后那条线还是拖不动」。

### 2.9 收起条 tab 的点击被 core 抢先 `expand()`

core 对收起边条 tab 的默认处理是 `expand()`，好在入口有 `if (event.defaultPrevented) return`。
→ capture 监听里按顺序判断：`≡`（`.bb-dockview-item-title-icon`）先 `preventDefault` 再放行（它绑了
Blazor 的 `@onclick`，不能吞）、`.dv-default-tab-action`（关闭按钮）直接放行、仅收起态才 `preventDefault` 开 peek。

### 2.10 `≡` 与关闭按钮共用 `dv-default-tab-action` 类名

C# 的标题栏按钮（`DockViewTitleBar.razor`）借 core 的类名拿样式，导致「隐藏边条 tab 的关闭按钮」
会连它一起隐藏。→ 选择器排除 `.bb-dockview-item-title-icon`：只隐藏展示、不删按钮，
JS 侧保证点击仍能关闭。

### 2.11 边条组没有 `removeGroup` 分支

官方 `removeGroup` 只处理 grid / floating。→ 在 `DockviewComponent.prototype.removeGroup` 里补
`type=='edge'`：先关面板，再 `removeEdgeGroup(position)`。

### 2.12 边条几何被当成浮窗尺寸

钉起态关面板再补加，`currentPosition` 会是 35px 的边条几何。→ 加阈值判断
（`width ≥ 120 && height ≥ 80` 才认），并让边条删除不记位置。

### 2.13 浮窗最小尺寸只有 20（且出容器后连 20 都没有）

核心 `moveRight/moveBottom` 的 `minWidth = -left + minimumInViewportWidth`；`left` 约等于浮窗自身
left。容器内走 fallback `MINIMUM_WIDTH=20`，一旦左/上缘越出容器就走我们设的负值 → 下限≈0。
→ 见 §1.3「尺寸下限」。

### 2.14 浮窗缩放时整窗会平移 1~2px（**已修，2026-11-16**）

8.x 把 `originalX/originalY` 从「元素边缘」改成「指针坐标」，但 `moveBottom/moveRight` 仍按边缘语义
反推 `originalY - originalHeight` ⇒「指针 − 尺寸」= 边缘 + ε。手柄跨边缘且外侧 2px 被 `overflow:hidden`
裁掉，可点区间是「边缘内侧 0~2px」，故 ε 恒为正 → 拖上边线整体下移、拖下边线整体上移。

同一条路径还有第二个缺陷：`moveTop/moveLeft` 的下界写死 0，而 `setBounds` 的下界是 `-yOffset`
（默认配置下也允许负坐标）⇒ 浮窗在容器外时抓顶/左边缘会被整窗拉回容器。

两处合并成一个补丁（`overlay.ts`）：四个 `move*` 改**位移式**，只新增 `originTop/originLeft` 两个字段。
细节与探针见 §5.3。

### 2.15 删除「恢复后手工回写浮窗位置」（老版本补丁退役）

老版本在 `postLayoutInit` 里把存档的 `position` 手工写到浮窗外壳：

```js
fg.group.element.parentElement.style.inset = [top, right, bottom, left].map(...)
```

**为什么老版本必须有**（5.1.0 内核的两个缺陷）：
1. `Overlay.setBounds` 写完内联样式后会**再量一次 rect 并反写位置**，且**没有 0 尺寸保护**。
   `fromJSON` 恢复时若容器/浮窗尚未布局（`display:none`、切布局瞬间、`onlyWhenVisible` 延迟挂载），
   rect 全为 0 ⇒ 位置被反写成 `0 - containerRect.top/left` ⇒ 浮窗跳到容器原点（“回到默认位置”）。
   另外 `bottom` 分支还拿 `document.body.offsetHeight` 推算，与真实容器无关。
2. 更早的版本只还原 `top/left`（`const { top, left } = position`），`bottom/right` 锚定的浮窗
   `top` 是 `undefined` ⇒ `'undefinedpx'` 被浏览器忽略 ⇒ 这类窗口刷新后确实丢位置。
   `2b3938f2`（2024-12，加 ShowPin 那次）才改成完整 `inset` + `auto` 兜底。

**8.9.0 为什么不需要**：`setBounds` 增加了 `hasLayout()` 早退（rect 0×0 直接 return，保留构造时写入的值）；
`toJSON` 记录锚定边、`getAnchoredBox()` 按「有 `left` 用 `left`、否则 `right`；`top`/`bottom` 同理」还原，
与手工拼装完全等价。**实测**：把这段 `if (saved?.position)` 关掉，`probe-float-geometry` 的
`S5.2（外壳 inset = 保存的位置）` 仍通过；删掉后全量探针全绿（当时 15 个，现 16 个）。

**为什么删而不留**：这段是在内核写完位置之后再用绝对值强写，绕过了 `Overlay` 的锚定归一化与位置 clamp。
一旦边界策略改回正数/`boundedWithinViewport`，它会立刻把内核刚夹回视口的窗口又推出去 —— 属于埋雷。

### 2.16 收起到标题栏：必须以上边为基准（迁移回归，已修）

**现象**：浮窗靠近 dockview 底部时点 down，窗口以 **bottom 为固定边**、从**顶部**减高，标题栏整块往下跳；
再点展开又从顶部弹回去。

**原因**：`Overlay.setBounds({height})` 只写高度，会沿用当前的 `verticalAlignment`。浮窗被拖到容器下半区后，
内核在 `setupDrag` 里按「谁更近」把锚定切成 `bottom`（`if (top <= bottom) bounds.top = top else bounds.bottom = bottom`），
之后再单独改 height 就变成「下边不动、上边跟着走」。

**5.x 为什么是对的**：老代码手写高度，并在 `top === 'auto'`（即 bottom 锚定）时显式补偿
`bottom = bottom - (Δheight)` —— 等价于把 top 钉住。迁移到 `setBounds` 时这层补偿丢了，属本次升级引入的回归。

**修法**：新增 `setFloatingHeight(overlay, group, height)`，量出外壳相对宿主的当前 `top`，连同 `height` 一起写
（`setBounds({ top, height })` 会把对齐方式一并改回 `top`）。`down()` 的收起/展开两个分支、以及
`normalizePackupByHeight` 的残余像素抹平，全部改走它；无布局环境（rect 0×0）时退回只写 height。

实现细节：外壳取 `floatingShell(group) ?? group.element.parentElement`（与 `down()` 的兜底一致，
找不到外壳时宁可写错一层，也不要让 `down` 变成静默无操作）；`top` 用「外壳 rect − 宿主 rect」，
与内核 `setBounds` 里的算法同源（同样的坐标系假设），不会引入额外偏差。

**验证**：`probe-float-geometry` 新增 S10 四条 —— 先把锚定切成 `bottom`（模拟贴底浮窗），
收起后断言 `top` 不变且 `bottom` 变 `auto`；展开同样断言 `top` 不变、高度回到收起前。
反向验证：把辅助函数临时退回 `setBounds({height})`，S10.2 / S10.4 立即失败（`top=auto bottom=80px`），说明断言有效。
另补 S11 三条覆盖「删掉手工回写」后最关键的一条路径：`right/bottom` 锚定的浮窗 ——
序列化里存的是 `right/bottom`（不含 `top/left`），刷新后仍是 `right/bottom` 锚定且数值一致。

### 2.17 peek 收回后内容里的图标/单选按钮留在原地（已修，2026-11-18）

**现象**：点收起条 tab 弹出预览，再收回（再点同 tab / 点外部 / Esc / pin），浮层消失，
但内容里的一排小图标（表格行图标、单选按钮）**留在浮层原来的位置**不跟内容走。
看着像"闪一下"，实际会持续到引擎下一次重排；换 tab / 动一下窗口才消失。

**原因**：收回时 `_teardown` 与 core 都用 inline `visibility:hidden` 表示"这一层不该显示"。
但 `visibility` 是**继承**属性 —— 后代自己写着 `visibility: visible` 就能把祖先的 `hidden` 翻回来。
实测该面板子树：`root` 计算值 `hidden`、inline 也已写 `hidden`，但里面有 **15 个 `i.fa-solid`**
（报表表格每行一个的行图标）计算值仍是 `visible`，既无内联也无 `!important`（来自样式表规则）。
于是"整块内容都收了，只剩这串小箭头"。
结论：用 `visibility` 表达"整棵子树不可见"从原理上不成立，不是漏了一帧、也不是 core 的 bug。

**诊断方法（这次踩的坑，可复用）**：
- 只比较 `getBoundingClientRect` 与浮层矩形是否重叠是错的 —— **被上层盖住的元素同样"重叠"**。
  第一版 picks 因此把浮层下面、边条组标题栏里 4 个 `bb-dockview-control-icon` 当成残影
  （`ov=none`、父链 `dv-right-actions-container → dv-groupview`），白跑一轮。
- 正确做法：`document.elementsFromPoint(x, y)` 在浮层矩形内取固定点，输出每个点上最上层的元素
  及其归属（overlay 面板 id / groupview 组 id）；并在 `_teardown` **摘完 DOM 后同步**再采一次 ——
  那一刻还在最上层的东西就是残影。
- 但"visibility 被子孙翻回"这类问题点采样也会漏（小元素未必落在采样点上）：
  还要按层扫 `computed visibility === 'visible'` 的后代并计数，`root=hidden total=15` 一出来就定位了。

**修法**：不自己维护一套开关，复用 core 已有的状态位，只在 CSS 里把 inline `visibility:hidden`
翻译成"整棵子树不可见"：

```css
.bb-dockview .dv-render-overlay[style*="visibility: hidden"] { opacity: 0; }
```

`opacity` 不继承、不被后代覆盖；core 一清掉 `visibility`（面板该显示了）规则自动失效，
不需要给"展开 / 离开边条 / 组销毁"挂任何恢复事件。JS 侧只多一个 `_showLayer()`
（peek 强显时清 `visibility`，不等 core 那一帧）。

**试过但否掉的**：自己维护 opacity 状态（`_hideLayer` 写 `opacity:0`、配 `_showLayer` 清）。
"按死"于是变成持久状态，恢复点必须覆盖三条路径（组展开 `onDidCollapsedChange`、
组离开边条 `onDidLocationChange`、组销毁）——漏一条就是面板永久隐形；
而 CSS 联动把这些全部交还给 core 的既有语义，不新增状态。

**验证**：收回后 `[bb-peek ...] overlays=` 里该层 `style=hidden / css=hidden / op=0`，肉眼无残留；
再弹出时 `visibility` 被清空、`op=1`，内容完整。
（诊断用的 `_trace / probe / kept` 已在确认修复后整段删除，代码里不再有 `[bb-peek ...]` 输出。）

### 2.18 钉起 / 取消钉起后激活面板变成「最后搬进去的那个」（已修，2026-11-18）

**现象**：浮窗浮起、取消浮起都能记住当前激活的面板，唯独钉起 / 取消钉起丢——
钉起后边条的 active tab、取消钉起后回原组的 active tab，都不是原来选中的那个，
而是"最后一个被搬过去的面板"。

**原因**：`pinToEdge` / `unpinFromEdge` 都是逐面板 `moveGroupOrPanel`。
core 每次搬都在末尾无条件 `doSetGroupAndPanelActive(destinationGroup)`
（`dockviewComponent.ts:5904-5906`），所以逐个搬完，**最后搬进去的那个**成了 active，
钉起前选中的那个被覆盖。浮窗不丢，是因为 `createFloatingGroup`（`dockview-group.js:586-600`）
搬完显式 `activePanel.api.setActive()` 定稿；钉起 / 取消钉起当时漏了这一步。

**修法**（不加新状态、无"无 active"中间态）：搬之前捕获 `group.activePanel`，
搬完再 `setActive()` 把激活定稿回它——与浮起路径同一套做法：
- `pinToEdge`：单目标组，搬完 `activePanel.api.setActive()`。
- `unpinFromEdge`：一条边条可能钉了多个来源组，按 `params.edgeOrigin` 分组各自搬回；
  只当捕获的 activePanel 属于当前组（`list.includes`）才 `keepActive?.api.setActive()`，
  其余组保持 core 默认（最后搬进去的激活），符合"按钉起时分组取消"语义。

**为什么不用 `skipSetActive` 参数**（逐条核过源码，不是凭直觉）：

1. **语义错位**：`skipSetActive: true` 保的是**目标组自己当前的 active**，
   不是我们想带过去的"源组原 active"。目标组要么是新建的空 edgeGroup、
   要么是钉起时用 `keepEmptyGroups` 留下的空占位组，本来就没有我们要的那个；
   skip 掉只会保留一个无关的（或不存在的）active，最后仍得 `setActive()` 纠正。
2. **空组时会被 core 强制作废**：`dockviewComponent.ts:5898-5901`
   `skipSetActive: (options.skipSetActive ?? false) && !isDestinationGroupEmpty`
   ——目标组为空时第一个搬入的面板无条件激活，skip 失效。
   我们的目标组恰恰多为空白，skip 在关键那一步不起作用，非空组时又生效，两套行为不可靠。
3. **会连 `doSetGroupAndPanelActive` 一起关掉**：`dockviewComponent.ts:5904-5906`
   该调用被 `!options.skipSetActive` 守卫；传了 skip 则目标组不设为 active group、
   不处理 maximized group 退出、不发 `activePanelChange`。这些都是搬动后本该正常发生的。

core 每次 move 无条件激活目标组是既定设计，顺着它、搬完一行 `setActive()` 定稿才确定；
`skipSetActive` 零收益、只增分支。（早先记录的"跳过会造成无 active 瞬时态"与"为保 tab 顺序要传
`index`"两条理由经回读源码并不成立：`&& !isDestinationGroupEmpty` 已规避空组全跳；
不传 `index` 时 `openPanel` 天然追加到末尾，顺序本就保持——以本节为准。）

**验证**：钉起 / 取消钉起后 active tab 均为钉起 / 取消钉起前选中的那个；
同一边条多来源组取消钉起时，只有该 active 面板所属组恢复它，其余组不受影响。

---

## 3. 正确性复核

### 3.1 官方 API 存在性（逐个在 8.9.0 构建里核对）

`addEdgeGroup` / `removeEdgeGroup` / `getEdgeGroup` / `getEdgeGroupPanel` / `setEdgeGroupCollapsed` /
`setEdgeGroupPeeking` / `isEdgeGroupAutoHide` / `onDidEdgeGroupAutoHideChange` /
`getEdgeGroupExpandedSize` / `repositionPanelOverlay` / `overlayRoot` / `announce` /
`setHeaderPosition` / `setSize` / `isCollapsed` / `onDidCollapsedChange` /
`createDismissableLayer` / `prefersReducedMotion` / `DockviewCompositeDisposable` /
`defineModule` / `registerModules` / `transformFloatingGroupDrag` / `api.getGroup`
（后者落到 `BaseGrid.getPanel(id)`，返回 **group**，不是 panel）——全部存在。

### 3.2 语义核对

- **锚定归一化**：`down()` / 最大化 / 还原全部走 `overlay.setBounds()`，不再手算 `bottom`；
  `clampFloatingSize` 与 `normalizePackupByHeight` 里调用 `setBounds` 会再次触发 `onDidChange`，
  已用 `clamping` 标志 + 「达标即返回」双重挡住重入。
- **事件与监听成对**：`_track/_untrack` 管理边条组的 click/`onDidCollapsedChange`；
  peek 会话的监听全挂在 `DockviewCompositeDisposable`，`_teardown` 统一释放；
  peek 的 DOM 还原先判 `container.parentElement === s.content`，重复打开同一位置时不会把内容搬错。
- **状态单一真相**：收起态只由 `packup` 表达，几何与图标都由它推导（拖高/压平两个方向都归一）。
- **几何只有一个写入者**：浮窗位置/尺寸的落点只有 `Overlay.setBounds`（拖动、缩放、最大化、收起、恢复），
  wrapper 不再旁路写 `style.inset`；这保证了锚定归一化与 clamp 不被绕过。
- **删除路径**：edge 组的 close / removeGroup / unpin 三条都可能摘边条，均先 `getEdgeGroup(position)`
  判存在再 `removeEdgeGroup`，无重复摘除。
- **序列化**：`edgeGroups` 的空组/孤儿视图会在 `saveConfig` 前清掉，避免脏条目反复回填。

### 3.3 回归验证

17 个 jsdom 探针全绿（`probe-float-geometry` 51 条、`probe-float-resize-anchor` 16、`probe-always-render` 11、
`probe-float-resize` 13、
`probe-hidden-separator` 23、`probe-icon-disabled` 12 有显式计数；`probe-autohide`、`probe-autohide-edgecases`、
`probe-unpin-group`、`probe-snap`、`probe-dynamic-add`、`probe-compat-pin`、`probe-size-order`、
`probe-size-restore`、`probe-peek`、`probe-float-restore`、`probe-d3-drag` 为分场景断言，均无失败）。
探针副本由 `sync-js.mjs` 做 md5 比对，防止「跑的是旧副本」。

---

## 4. 已知限制（记录，未修）

1. **视口护栏只覆盖拖拽**：`transformFloatingGroupDrag` 只在拖动时调用，程序化 `setBounds`、
   浏览器窗口缩小、容器尺寸变化都不会把浮窗拉回视口内（当前项目无此场景）。
2. **同分支多组先后钉起**：取消钉起时按钉起顺序还原会挤压（LIFO 正常），已知可接受。
3. **浮窗内部隐藏组不处理**：`getBranchByGroup` 对浮窗返回 undefined；实际路径上钉起会先 `dock()` 回网格。
4. **上边为基准的必然副作用**：浮窗贴近**视口底部**时展开，底边会向视口外长（拖拽护栏只管拖拽）。
   这是桌面窗口的正常行为，也是 5.x 的行为；若要禁止，只能在展开时压缩高度，那就不是"还原上次高度"了。
5. **主题变量覆盖待办**：`.bb-dockview.dockview-theme-*` 应为后代选择器、`--dv-tab-divider-color` 应删、
   `--dv-floating-box-shadow` 重复、深色主题 4 条图标颜色为真需求。
6. **浮窗内 `renderer:'always'` 面板盖住八向手柄**（2026-11-17 记录，未修）：
   现象：浮窗激活 always 面板时，左 / 右 / 下 / 四角手柄拖不动（移上去没有 resize 光标），只有标题栏和上边缘能拖；
   同组切到 onlyWhenVisible 面板立刻恢复。
   成因三条，缺一不成立：
   ① core 给浮窗内 always 层写 inline `z-index: calc(999 + aria-level*2 + 1)`（`overlayRenderContainer.ts:620`），
      比浮窗容器自身的 `calc(999 + aria-level*2)`（`overlay.ts:52`）高 1 ⇒ 内容层整块压在浮窗上。
      `dockview.css:1239` 的 `.dv-render-overlay-float` 本想让它低一层（998），但
      `calc(var(--dv-overlay-z-index) - 1)` 没有 fallback、变量又是自引用，整条声明失效。
   ② `.bb-dockview .dv-resize-container { overflow: hidden }`（为圆角）把 core 画在容器**外** 2px 的手柄裁掉，
      可点区只剩内侧 2px，而内侧正好落在 ① 的覆盖范围内。core 的手柄 z 还因自引用笔误退化成 auto（见 §2.5），
      容器内那 2px 本来也要靠我们补的 `z-index:10` 才露得出来。
   ③ §7.2 ③④ 删掉的旧补丁（`moveAlwaysRenderPanel` + `.dv-render-overlay-float{-1!important}`）正是把这一层
      摁到浮窗之下的东西，删掉后不再有人兜这一层。
   当时验证漏了左右/下边：§7.2 只复核了「拖上/下边缩放时 overlay 与浮窗组同步」，而上边恰好不受影响。
   为什么不恢复旧补丁：8.x 内容归 `overlayRenderContainer` 管，手工搬走会让 `clipPath`、
   `retainPreviousGeometry`、`visibility` 空转，并与 peek 的 `repositionPanelOverlay` 直接冲突。
   待选方案（按风险排序）：
   A. 去掉容器的 `overflow: hidden`，圆角下移到 `.dv-view` / `.dv-render-overlay-float` / 标题栏，
      手柄向外扩到 6px —— 恢复官方「手柄在容器外」的设计前提，不与 core 抢层级（推荐）；
   B. 只在浮窗 overlay 四周留 4px 不覆盖区（clip-path / inset），需跟随尺寸维护；
   C. 自建手势层挂 `overlayRoot`、z 高于 `1000 + 2n`，最稳、工作量最大。
   已排除：恢复 `-1 !important`（会把内容压到所有浮窗之下，且靠浮窗背景恰好透明兜底）。

7. **peek 从隐藏恢复时，字体图标与原生控件晚一两帧出现**（2026-11-18 记录，倾向接受）：
   现象：浮层收回再弹出，`i.fa-solid`（字体图标）和 `input[type=radio]` 比同屏文字晚一点出现
   （一到几帧，不是整块内容慢）。
   成因三条叠加：
   ① 修 §2.17 之前这些元素**从未真正被隐藏过**（被子孙 `visible` 翻回），一直有 raster 缓存；
      现在第一次真正隐藏，缓存被丢弃，恢复必须重新光栅化 —— 而字形（`::before` 的 `content`）
      与原生表单控件正是重绘最贵的两类，所以只有它们慢。
   ② `opacity` 0→1 会动合成属性：`.dv-render-overlay` 自带 `will-change: transform` /
      `translate3d` / `contain: layout paint`，已在独立合成层里，属性变化会触发重新分层并丢 raster，
      比单纯切 `visibility`（只改 display list）贵。
   ③ 滑入动画每帧调 `repositionPanelOverlay` 换 `clipPath`，本来每帧就要重绘，把 ①② 放大。
   不是 bug、不累积，恢复后不再出现。若要消除，按性价比：
   A. 把压制从 `opacity:0` 换成下沉子树 —— `.dv-render-overlay[style*="visibility: hidden"] * { visibility: hidden !important }`
      （恢复只走 display list；风险：子树里若有刻意在隐藏祖先下仍要显示的浮层会被一起压掉）；
   B. `clipPath` 只在滑入结束时写一次（牺牲"内容从内边缘逐段揭开"的观感）；
   C. 接受。若 A 仍慢，说明瓶颈就是重新光栅化，只剩"不隐藏"这一条，与 §2.17 冲突 ⇒ 走 C。

> 复核时发现的两处语义不精确已顺手收紧（不再列入限制）：
> ① `markFirstVisibleElement` 增加 `.dv-view-container` 守卫，边条组不再往里传；
> ② `onRemovePanel` 的边条分支显式 `delete params.currentPosition`，避免浅拷残留旧浮窗几何。

---

## 5. 老版本源码补丁对齐审计

老版本是「5.1.0 自定义构建」：`dockview-vendor/dockview-core-5.1.0-custom.patch`（636 行，8 个文件），
6.6.1 时代归档在 `patches-archive-6.6.1/`；8.9.0 现在只剩 `patches/` 下 **2 个文件（+24/−18）**。
当前产物 `dockview-core.esm.js` 的 md5 = `3adb41556f77189398b063b55a9eb984`，与
`vendor-manifest.json` 记录一致，说明下面「仍保留」的那条确实在产物里（`grep` 可复核）。

| # | 老补丁（文件 · 内容） | 意图 | 8.9.0 现状 |
|---|---|---|---|
| 1 | `dockviewComponent` · 根边缘 DnD `orthogonalize(position,{size:半屏})` + `createGroupAtLocation(location, options.size)` | 拖到根边缘产生的新组占半屏 | **已删除（2026-11-16）**。实测：跨方向拖到边缘走 `orthogonalize` 的**正交分支**，本来就 50/50，补丁在该场景无效；同方向扩展时上游 `Sizing.Split` 给 25~33%，观感差异不值得维护（详见 §5.1） |
| 2 | `dockviewComponent` · `getAnchoredBox` 去掉 `Math.max(...,0)` | 浮窗拖出容器后存的负坐标能原样恢复 | **仍以补丁保留**（产物 17531 行 `result.left = options.position.left`） |
| 3 | `dockviewComponent` · `FloatingGroupOptions.className` + 传给 Overlay | 给浮窗外壳加自定义类 | 删除（无消费者；浮窗观感由 CSS 与 Edge Group 承担） |
| 4 | `dockviewComponent` · `getGroupShape()` + 目标组让半 | 组间拖拽新组吃目标组一半 | 删除；8.9.0 `sizingForDrop` 默认返回 `Sizing.Split(index)`（产物 19610），语义等价 |
| 5 | `groupPanelModel` · `GroupOptions.size / targetIndex` | 配合 1、4 透传尺寸与插入位置 | **均已删除（2026-11-16）**：`targetIndex` 因无消费者先删；`size` 只服务半屏补丁，半屏删除后成死代码，一并撤掉（`patches/dockview-dockviewGroupPanelModel.patch` 已移除） |
| 6 | `baseComponentGridview` / `branchNode` / `gridview` / `splitview` · `targetIndex` 全链路 | 让新组落在"目标 view 的位置"上 | 删除；8.9.0 `addView` 只在 `size.type === 'distribute'` 时均分（产物 1560），显式尺寸天然保真 |
| 7 | `splitview` · `relayout` 里注释掉 `distributeEmptySpace` 式的均分 | 防止显式尺寸被均分覆盖 | 删除（同 6，上游已条件化） |
| 8 | `math` · `clamp` 在 `min > max` 时返回 `Math.max(value,min)` | 修被 #10 打出的 clamp 参数倒挂 | 删除；#10 已换成公开选项，内核 `clamp` 保持原样（`return min`） |
| 9 | `overlay` · `MINIMUM_WIDTH=180 / MINIMUM_HEIGHT=28` | 抽屉时代的最小尺寸 | 由 wrapper `clampFloatingSize` 取代：宽 ≥ 200、高 ≥ 标题栏（抽屉已删） |
| 10 | `overlay` · `setBounds` 四处 `clamp` 注释掉 | 允许浮窗拖出容器 | 由 `floatingGroupBounds: {minimum*: -10000}` + `transformFloatingGroupDrag` 视口护栏取代（比老行为更严：整窗不出视口） |
| 11 | `overlay` · 拖拽时把指针夹在 body 视口内（`clientX∈[30, vw-30]`、`clientY≥0`） | 拖出视口但抓得住 | 由 `transformFloatingGroupDrag` 取代（按整窗夹视口，不再依赖指针） |
| 12 | `overlay` · `setBounds` 里 `overlayRect.top < 0 ? 0` + 用 `document.body.offsetHeight` 推 bottom | 老内核无 0 尺寸保护时的土办法 | 弃用；8.9.0 `setBounds` 有 `hasLayout()` 早退，恢复位置由 `getAnchoredBox` 负责（见 §2.15） |
| 13 | `overlay` · `originalX/originalY` 改用**元素边缘**（`overlayRect.top/bottom/left/right`） | 缩放以元素边缘为基准，避免指针偏移 | **已修（2026-11-16）**：8.9.0 上游改回**指针坐标**而 `moveBottom/moveRight` 仍按边缘语义反推 ⇒ 首帧整窗平移 ε。改用 `originTop/originLeft` + 指针位移（§5.3） |
| 15 | `overlay` · `top = clamp(y, 0, maxTop)` / `left = clamp(x, 0, maxLeft)` | 缩放时把位置夹在容器内 | **已修（2026-11-16）**：下界 0 导致“浮窗在容器外时拖顶/左边缘会整窗跳回容器”。下界改 `-Number.MAX_VALUE`（与 #13 合并为同一个补丁） |
| 14 | `overlay` · `onDidChangeEnd` 带 `{eventType:'drag'}` + `isMoved` 判断 | 区分拖动/缩放结束 | 删除（无消费者） |

### 5.1 两条内核补丁在界面上的表现（① 已删除 / ② 保留）

**① 根边缘 DnD 新组占半屏 —— 已删除（2026-11-16）**

原补丁在 `dockToLayoutEdge()` 里给新组写死 `size = 布局宽/高 的一半`。实测发现它只在**同方向扩展**时生效：

| 场景 | 无补丁 | 打补丁 |
|---|---|---|
| 跨方向拖到边缘（竖向根 + 往右拖，本项目最常见） | **50%**（`orthogonalize` 走 `insertOrthogonalSplitviewAtRoot`，正交分支天然均分） | 50%（走不到补丁） |
| 同方向拖到边缘（横向根 + 往右拖） | 25%（`Sizing.Split` 取参考组一半）/ 33%（`Distribute`） | 50% |

jsdom 实测（容器 1200×800）：竖向根 `addGroup({direction:'right'})` → 新组 600（50%）；横向根 → 400（33%）。
所以补丁在最常见场景下是**死代码**，只在“一行两列再往右扩”时把 25~33% 变成 50%，不值得为它维护一条内核补丁 —— **已移除**，
补丁清单只剩 `getAnchoredBox` 一条行为补丁。

**② 负坐标浮窗恢复**（产物 17531 行 `getAnchoredBox`）
- 触发：把浮窗拖到**当前 dockview 容器范围之外**（嵌套场景最常见：越过子 dockview，落在外层区域或页头/侧栏上），
  然后刷新或切换布局。
- 现象：浮窗**回到原处**，存档里的 `left/top`（甚至 `right/bottom`）可以是负数。
- 不补丁：`Math.max(value, 0)` 会把负值夹成 0 → 浮窗被拉回容器左上角（或右下贴边），表现为“刷新后浮窗跳位置”。
- 边界：容器铺满视口、没有偏移时，视口护栏已经把窗口夹在视口内，容器坐标不会为负 → 这条补丁**看不出差别**；
  只有嵌套 / 带页头侧栏（宿主在视口里有偏移）时才显现。本项目正是嵌套结构，所以它是必需的。

**结论（2026-11-16 定稿）**：14 条老补丁意图里 —— 1 条按设计保留（#2 负坐标恢复）、1 条补做（#13 缩放基准，
另发现 #15 同源缺陷，合并成一个补丁）、1 条删除（#1 半屏）、其余由上游实现或 wrapper 替代 / 明确弃用。
**当前没有未对齐项**：保留的 2 个补丁都对应上游 bug（见 §6），业务差异全部落在 wrapper（§5.4）。

### 5.2 当前补丁状态（2026-11-16 之后）

| 补丁 | 文件 | 性质 | 状态 |
|---|---|---|---|
| `getAnchoredBox` 去 `Math.max`（负坐标浮窗恢复） | `dockviewComponent.ts` | **上游 bug**（`setBounds`/`toJSON` 允许负坐标，恢复路径却夹 0） | 保留 |
| `setupResize` 位移式 + 下界放开（ε、底/右 0 尺寸、跳回容器） | `overlay.ts` | **上游 bug**（同一函数两套语义 + 与 `setBounds` 的下界不一致） | 保留 |

补丁文件只剩 2 个；`dockview-dockviewGroupPanelModel.patch` 已删除（`size` 字段无消费者）。
产物 md5：`3adb41556f77189398b063b55a9eb984`。源码侧在 `D:/Projects.Kiro/dockview` 分支 `bb-8.9.0`（暂存区）。

### 5.3 缩放补丁（#13 + #15）做了什么

`startPosition` 只增加两个字段：`originTop / originLeft`（元素左上角的容器坐标），其余复用上游已有的
`originalX/originalY`（首个 pointermove 的指针位置）与 `originalWidth/Height`。四个 `move*` 改成**位移式**：

```ts
moveTop:    top    = clamp(originTop + (y - originalY), -Number.MAX_VALUE, maxTop);
            height = originalHeight - (top - originTop);
moveBottom: top    = originTop;
            height = clamp(originalHeight + (y - originalY), minHeight, maxHeight);
moveLeft:   left   = clamp(originLeft + (x - originalX), -Number.MAX_VALUE, maxLeft);
            width  = originalWidth - (left - originLeft);
moveRight:  left   = originLeft;
            width  = clamp(originalWidth + (x - originalX), minWidth, maxWidth);
```

- **位移式**只依赖“指针移动了多少”，与抓取点在手柄的哪个像素无关 ⇒ 首个 pointermove 不平移（ε 消失）；
- 下界改 `-Number.MAX_VALUE` ⇒ 浮窗在容器外时拖顶/左边缘不会被夹回 0。

**为什么不用“指针 − 抓取偏移”的写法（v1 的坑）**：`grabDy = y0 − originTop` 对上/左边缘是“抓取点到上边的距离”，
但对**底/右**手柄它≈整个高度，`y − grabDy` 得到的是元素**上边**，`height` 会被算成 0 —— 表现就是
“拖底边立刻塌成标题栏 → 自动收起”。位移式没有这个歧义。

**验证**：`probe-float-resize-anchor` 共 16 条 —— S1 抓取偏移、S2 容器外顶边、S3 容器外左边、
S4 底边（按下不塌、上拖 10 → 290、下拖 30 → 320、上边不动）、S5 右边（左拖 20 → 380、左边不动）。
反向验证：把四个函数退回上游写法后 **9 条失败**（含 S4.2/S4.4 的底边塌陷），说明断言有效。

### 5.4 产品决策（不是补丁，升级时无需复核）

以下行为与 5.x 不同，但**不是漏搬补丁**，而是刻意的产品选择，全部由 wrapper 用官方能力实现：

| 行为 | 来源 | 说明 |
|---|---|---|
| 浮窗可以跨出子 dockview | `floatingGroupBounds: {minimum*: -10000}`（官方配置） | 嵌套场景必需；负值表示不按容器夹 |
| 但不许整窗出浏览器视口 | `transformFloatingGroupDrag`（官方钩子） | 整窗留在视口内，拖不丢 |
| 拖到边缘的新组尺寸 | 上游默认（不做定制） | 跨方向走正交分支 = 50%；同方向 = `Sizing.Split` 的 25~33%。老版本的“一律 50%”补丁已删（价值低、且最常见场景本来就 50%） |
| 收起到标题栏以上边为基准 | `setFloatingHeight`（wrapper） | 与 5.x 行为一致，属产品语义而非内核行为 |

**升级检查清单**：先跑探针；再看本节，凡是这里列过的差异都**不用**去补丁清单里找原因。

---

## 6. 补丁性质：是「源码 bug」还是「业务冲突」

判断标准（可证伪，不靠印象）：

1. **同一份数据/同一次手势，core 自己的两条路径给出不同结果** → **源码 bug**；
2. core 内部自洽，只是语义不合我们的需求 → **业务冲突**（留在 wrapper，不进上游）；
3. core 干脆没提供入口 → **功能缺口**（不是 bug）。

### 6.1 什么叫「夹 0」

「夹」= clamp，「夹 0」= 把坐标强制限制为**不小于 0**：

```js
result.left = Math.max(position.left, 0);   // 夹 0：-50 变成 0
top = clamp(y, 0, maxTop);                   // 下界 0：同样的意思
```

在屏幕坐标里它等于「不许跑到容器左上角之外」。后果：浮窗本来在容器上方 50px（`top = -50`），
一夹就变成 `top = 0` —— 视觉上窗口**瞬移到容器顶边贴着**，这就是用户看到的「刷新后跳角落 / 缩放时跳回容器」。

### 6.2 逐项判定与证据

| 项 | 判定 | 证据（core 自身的行为不一致） |
|---|---|---|
| `getAnchoredBox` 恢复位置夹 0 | **源码 bug** | 同一次拖动里 `setBounds` 的下界是 `-yOffset = -(h - minimumInViewportHeight)`，**默认配置（100）下就允许 `top ≥ -(h-100)`**；`toJSON` 也如实存负数。只有恢复路径把它夹成 0 → 能拖出去、能存下来，刷新后回不来 |
| `moveTop/moveLeft` 下界 0 | **源码 bug** | 同上：拖动路径允许负坐标，缩放路径却硬夹 0 —— 同一个浮窗「拖出去可以、碰一下顶边就弹回来」 |
| `originalX/originalY` 语义（ε 平移） | **源码 bug** | 8.x 把它们改成「指针坐标」，但 `moveBottom/moveRight` 仍按「下边/右边」语义反推 `originalY - originalHeight` —— 同一函数里两套语义，任何人拖底/右边缘都偏 2px |
| `GroupOptions.size` 透传（已删） | 功能缺口 | 无调用方，纯参数位 |
| 根边缘半屏（已删） | **业务差异** | 上游 `Distribute`/`Split` 自洽；跨方向拖拽走 `insertOrthogonalSplitviewAtRoot` 本来就 50% |
| 浮窗可跨容器 / 不许出视口 | **业务决策** | 见 §5.4，用官方配置与钩子实现，不是补丁 |

**结论**：现在保留的 2 个补丁 = **3 个上游 bug**（负坐标恢复、缩放下界、缩放基准），全部可以提 PR；
业务差异一条补丁都不用。

### 6.3 两个补丁具体改了什么

**① `getAnchoredBox`：恢复位置时不再「夹 0」**（`dockviewComponent.ts`，4 行）

```diff
- result.left   = Math.max(options.position.left, 0);
+ result.left   = options.position.left;
  // right / top / bottom 同理
```

修的是「刷新 / 切布局后浮窗跳回容器左上角」。尺寸的 `Math.max(width, 0)` 保留（尺寸为负无意义）。

**② `overlay.setupResize`：缩放用「位移式」+ 下界放开**（`overlay.ts`）

`startPosition` 只加两个字段 `originTop / originLeft`（元素左上角的容器坐标），四个方向改成：

```ts
moveTop:    top    = clamp(originTop + (y - originalY), -Number.MAX_VALUE, maxTop);
            height = originalHeight - (top - originTop);
moveBottom: top    = originTop;
            height = clamp(originalHeight + (y - originalY), minHeight, maxHeight);
moveLeft:   left   = clamp(originLeft + (x - originalX), -Number.MAX_VALUE, maxLeft);
            width  = originalWidth - (left - originLeft);
moveRight:  left   = originLeft;
            width  = clamp(originalWidth + (x - originalX), minWidth, maxWidth);
```

一次修掉三件事：

| 修的问题 | 怎么修的 |
|---|---|
| 拖底/右边缘整窗平移 1~2px（ε） | 不再用「指针 − 尺寸」反推边缘，改用「原点 + 指针位移」 |
| 浮窗在容器外时抓顶/左边缘被拉回容器 | 下界从 `0` 改成 `-Number.MAX_VALUE`（与 `setBounds` 一致） |
| 拖底边时高度被算成 0 → 塌成标题栏、误触发收起 | 位移式公式与抓取点无关（曾用「指针 − 抓取偏移」，对底/右手柄会算出 0） |

验证：`probe-float-resize-anchor` 16 条（S1 抓取偏移 / S2 容器外顶边 / S3 容器外左边 / S4 底边 / S5 右边）；
退回上游写法时 9 条失败。

---

## 7. 逐 diff 复查记录（2026-11-16）

复查范围：暂存区 10 个文件（`+25846 / −13161`），含 `dockview-core.esm.js`（vendored 产物）与 `dockview.css`（上游主题）。
产物与主题按“版本 + md5 + 补丁清单”核对（§5.2 / §6），本体逐一看的是 7 个 wrapper 文件与 `dockview-bb.css`。

### 7.1 通过项

| 检查项 | 结论 |
|---|---|
| 旧概念残留 | `floatType` / 抽屉浮窗 / `.bb-dockview-aside` / 自研 dropdown 菜单 / `params.observer` / `getGroupShape` / `eventType` 载荷 / `disableTabsOverflowList` **均为 0 处**（仅注释与 `drawer` 参数复用保留） |
| JS ↔ CSS 类名 | JS 里出现的 `bb-*` 状态类都能在 `dockview-bb.css` 找到规则；`bb-edge-peek-pin/close` 无样式（仅作标记，无害） |
| 边条 peek 生命周期 | `init()` 订阅 `onDidAddGroup/onDidRemoveGroup/onDidEdgeGroupAutoHideChange`；`dispose()` 先 `_teardown()` 再清 `_listeners` 与 `_disposables`；会话内的监听/拖拽监听都挂在 `CompositeDisposable` |
| 调试残留 | 无 `console.log`/`debugger`/TODO；仅 `dockview-config.js` 一条**有意**的 `console.warn`（数据驱动通道误入 invisiblePanels） |
| C# ↔ JS 接口 | `init` / `reset` / `update` / `switchLayout` / `save` 均在 JS 侧存在；`params` 事件（`_panelVisibleChanged` / `_loadTabs` / `_initialized` / `_groupSizeChanged`）名字对得上 |
| 运行时守卫 | `guardCollapsedSaveProportions`（`saveProportions` 在 `size===0` 时跳过）与 `guardMaximizeExit`（退出最大化期间抑制保存）在 8.9.0 仍适用：`_maximizedNode` 字段依旧存在（13 处引用），守卫命中后只是 toggle 一个标志 |

### 7.2 复查中修掉的项

**① `observeFloatingGroupLocationChange` 可能命中自己**（浮窗落回网格后 id 可能已无 `_floating` 后缀）→
极端情况下 `removeGroup(self)`。已加 `g.id != group.id` 自保护。

**② `Renderer=Always` 到不了内核（已接通并验证）**：
- `cerateDockview()` 现在构造 `DockviewComponent` 时传 `defaultRenderer`（8.x 真正决定面板渲染器的开关）；
- 同时把 C# 枚举值归一化：Blazor 序列化会把 `DockViewRenderMode` 写成**数字**（0/1，默认值还会被
  `JsonIgnore(WhenWritingDefault)` 省掉），而 core 只认 `'onlyWhenVisible'` / `'always'` 字符串，
  0/1 落进 core 的 `switch` 会抛 `invalid renderer type`。现在统一成字符串再往下传。
- 顺带发现一个**既有隐患**：显式设 `Renderer=OnlyWhenVisible`（序列化成 0）时，JS 里所有
  `=== 'onlyWhenVisible'` 判断都不成立 → 会跳过 `_loadTabs`，内容将不再延迟加载。归一化后此问题消失。

**③ 删除 `moveAlwaysRenderPanel()`**（约 20 行，5.x 手工搬 DOM）：
- **老版本为什么需要**：`app-old/js/dockview-panel.js` 里，浮窗中的 active always 面板会被手工
  `appendChild` 进浮窗组的 `.dv-content-container`，inactive 面板则搬回暂存的 `parentEle`；
  两处调用分别在 `onAddPanel` 的 `setTimeout(0)` 和 `createFloatingGroup()` 的
  `addFloatingGroup(..., skipRemoveGroup: true)` 之后。5.x 的浮窗创建顺序（先 `moveGroupOrPanel` →
  `setVisible(group,false)` → 再加浮窗）会让 overlay 拿到旧组/0×0 的几何，手工搬 DOM 是当时的绕过办法。
- **8.x 为什么不需要**：`overlayRenderContainer.attach()` 自己把内容放进 `.dv-render-overlay`，
  按 `referenceContainer` 定位并跟随 visibility/dimension/location 变化；浮窗层级由
  `getFloatingWindowForGroup()` + `aria-level` 统一算（5.1.0 还是 `floatingGroups.find(...)`）。
  8.9.0 的 attach 另外补了 generation 防陈旧闭包、`retainPreviousGeometry`、按 layout dimensions
  写尺寸、popout/owner 管理；`_onDidMovePanel → debouncedUpdateAllPositions()` 5.1.0 起就有，
  8.x 沿用并补了 issue #1020 的回归测试（`addGroup + moveTo with defaultRenderer="always"`）。
  实际取舍依据是：wrapper 仍走 `setVisible(group,false)` + `addFloatingGroup(..., skipRemoveGroup:true)`
  这套老流程，但 8.x 的 overlay 定位/层级已由 core 完整接管，17 个探针与真机页面都验证内容始终
  `connected` 且跟随组；手工搬 DOM 反而会把元素从 overlay 里拽出来、破坏 core 定位。
- **落地**：删掉函数定义/导出，以及 `dockview-group.js` 的两处调用；只保留 4 行历史注释说明“为什么删”。

**④ 配套删除 `.dv-render-overlay-float { z-index: -1 !important }`**（与 ③ 必须一起做）：
- 这条主题规则是配合 ③ 的旧补丁：当年内容已手工搬进 `.dv-content-container`，overlay 副本需要压到背景后。
  函数删掉后规则没删，浮窗内容就被压到浮窗组的白色背景之后 —— 用户看到的就是“Always 浮窗空白”。
  两者由同一提交 `a1672357`（升级到 dockview 4.7.1）一起引入，是成对出现的绕过办法，不是两条独立需求。
- 上游 `dockview.css` 默认给 `.dv-render-overlay` 的是 `--dv-overlay-z-index: 999`，float 变体是 998；
  8.x core 还会按 `aria-level` 写 `calc(var(--dv-overlay-z-index, 999) + level*2 + 1)`。主题不应再硬写 -1。
- 已从 `dockview-bb.css`（源码与 UniMeta 静态副本各一处）删除该规则；drawer 变体
  `:not(.active)` 的 -1 是有意保留的，用于隐藏未激活的 peek 抽屉。
- 真机实测：浮窗 overlay 的子节点 `connected`、尺寸正常、HTML/文本长度非 0；旧规则在计算样式里是 -1，
  浏览器内模拟移除后恢复为 998、几何不变。最终视觉效果待重建重启后确认。
- **补充（2026-11-17）**：移除后实际生效的是 core 写的 inline `calc(999 + aria-level*2 + 1)`（1000+），
  不是 CSS 的 998 —— `.dv-render-overlay-float` 那条 `calc(var(--dv-overlay-z-index) - 1)` 因变量自引用而失效。
  所以浮窗内 always 内容会压在浮窗之上、盖住左 / 右 / 下与四角手柄（见 §4 第 6 条）。
  上面「拖上/下边缩放正常」只覆盖了上边，左右/下边当时没测到。

**遗留提示**：`UniMeta/.../wwwroot/_content/BootstrapBlazor.DockView/js/` 下的静态副本仍保留旧版
`moveAlwaysRenderPanel` 定义/导出/调用（与源码差异较大，属陈旧拷贝）。当前构建实际使用 Extensions 源
（运行中的指纹脚本 `dockview-group.js` 已 0 处引用），不要据此误判为仍需保留；统一清理这些副本应单独做。

**验证**：新增 `probe-always-render`（11 条）—— S1 归一化（字符串/1/0 三种输入）、
S2 always 面板在浮窗：两条内容都 connected、父级都是 `.dv-render-overlay`、overlay 数=2、切 tab 后不变、
S3 默认模式无 overlay 且内容在 `.dv-content-container`。全量 17 个探针无 ❌。
另在真机页面复核了浮窗前后 overlay 几何、切 tab 后内容常驻、拖上/下边缩放时 overlay 与浮窗组同步。

### 7.3 遗留项（记录，未改）

1. `Components/DockViewV2.razor` 仍渲染 `<DockViewDropdownIcon IconName="dropdown">`，但 JS 的 `getIcons()` 已不再克隆它
   → 模板里多一个死 DOM + 一次雪碧图取用。删一行即可，属 C# 侧清理（不影响行为）。
2. `pinToEdge` 复用了 `params.drawer.width` 作为边条**初始**宽度（5.x 抽屉参数）。
   实测确认这不影响“记住宽度”：边条尺寸由 core 序列化在 `edgeGroups[position].size`（拖到 500 → JSON 里就是 500），
   **刷新/切布局都能恢复**。仅“取消钉起后再钉起”会回默认 300 —— 因为 `removeEdgeGroup` 会销毁 view，
   之后 `getEdgeGroupExpandedSize()` 返回 0，此时任何“按已存尺寸回填”的写法都无效；要记住只能由 wrapper 自己缓存
   （`unpinFromEdge` 里存 size、`pinToEdge` 里优先取）。当前判断：不值得为这个小场景加缓存，保持现状。
3. 7 个 wrapper 文件里共有 94 处 `?.` / `??`，与项目“少用可选链”的约定不一致；属风格项，未动。
4. 浮窗内 `renderer:'always'` 面板盖住左 / 右 / 下与四角手柄 —— 由本节的 ③④ 删除旧补丁后暴露，
   与 §2.5 的 `z-index` 自成因不是同一条，详见 §4 第 6 条（未修）。
