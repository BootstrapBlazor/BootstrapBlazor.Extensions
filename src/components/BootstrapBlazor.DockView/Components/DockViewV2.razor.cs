// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using System.Collections.Concurrent;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockViewV2 组件</para>
/// <para lang="en">DockViewV2 component</para>
/// </summary>
public partial class DockViewV2
{
    /// <summary>
    /// <para lang="zh">获得/设置 布局配置</para>
    /// <para lang="en">Gets or sets the layout configuration</para>
    /// </summary>
    [Parameter]
    public string? LayoutConfig { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示关闭按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the close button is displayed. Default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowClose { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否锁定，默认为 false</para>
    /// <para lang="en">Gets or sets whether the component is locked. Default is false</para>
    /// </summary>
    [Parameter]
    public bool IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示锁定按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the lock button is displayed. Default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowLock { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示最大化按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the maximize button is displayed. Default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowMaximize { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否悬浮，默认为 false</para>
    /// <para lang="en">Gets or sets whether the component is floating. Default is false</para>
    /// </summary>
    [Parameter]
    public bool IsFloating { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示悬浮按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the float button is displayed. Default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowFloat { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示图钉按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the pin button is displayed. Default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowPin { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 客户端渲染模式，默认为 <see cref="DockViewRenderMode.OnlyWhenVisible"/></para>
    /// <para lang="en">Gets or sets the client render mode. Default is <see cref="DockViewRenderMode.OnlyWhenVisible"/></para>
    /// </summary>
    [Parameter]
    public DockViewRenderMode Renderer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 锁定状态变更回调方法</para>
    /// <para lang="en">Gets or sets the callback for lock state changes</para>
    /// </summary>
    [Parameter]
    public Func<string[], bool, Task>? OnLockChangedCallbackAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标签页可见状态变更回调方法</para>
    /// <para lang="en">Gets or sets the callback for tab visibility state changes</para>
    /// </summary>
    [Parameter]
    public Func<string, bool, Task>? OnVisibleStateChangedAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标签页调整大小完成回调方法</para>
    /// <para lang="en">Gets or sets the callback for when tab resizing is completed</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnSplitterCallbackAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 客户端组件脚本初始化完成回调方法</para>
    /// <para lang="en">Gets or sets the callback for when client component script initialization is complete</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnInitializedCallbackAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件内容</para>
    /// <para lang="en">Gets or sets the child content</para>
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 版本信息，默认为 null，未设置时可通过全局配置提供</para>
    /// <para lang="en">Gets or sets the version information. Default is null. When not set, it can be provided by global configuration</para>
    /// </summary>
    [Parameter]
    public string? Version { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 DockView 名称，默认为 null，用于本地存储标识</para>
    /// <para lang="en">Gets or sets the DockView name. Default is null and it is used for local storage identification</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? Name { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否启用本地存储布局，默认为 null</para>
    /// <para lang="en">Gets or sets whether local storage layout is enabled. Default is null</para>
    /// </summary>
    [Parameter]
    public bool? EnableLocalStorage { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 本地存储前缀，默认为 bb-dock</para>
    /// <para lang="en">Gets or sets the local storage prefix. Default is bb-dock</para>
    /// </summary>
    [Parameter]
    public string? LocalStoragePrefix { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 DockView 组件主题，默认为 Light</para>
    /// <para lang="en">Gets or sets the DockView component theme. Default is Light</para>
    /// </summary>
    [Parameter]
    public DockViewTheme Theme { get; set; } = DockViewTheme.Light;

    /// <summary>
    /// 嵌套 DockView 时生效防止生成冗余的 DOM 结构
    /// </summary>
    [CascadingParameter]
    private DockViewV2? DockView { get; set; }

    [Inject]
    [NotNull]
    private IConfiguration? Configuration { get; set; }

    [Inject]
    [NotNull]
    private IThemeProvider? ThemeProviderService { get; set; }

    private string? ClassString => CssBuilder.Default("bb-dockview")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private readonly List<DockViewComponentBase> _components = [];

    [NotNull]
    private DockViewOptions? _options = null;
    private ConcurrentDictionary<string, DockViewComponentState> _componentStates = new();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        var section = Configuration.GetSection(nameof(DockViewOptions));
        _options = section.Exists() ? section.Get<DockViewOptions>() : new();

        ThemeProviderService.ThemeChangedAsync += OnThemeChangedAsync;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        // 开启本体存储未提供 Name 时抛出异常提示
        if (IsEnableLocalStorage && string.IsNullOrEmpty(Name))
        {
            throw new InvalidOperationException("Name must be provided when local storage is enabled.");
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (!firstRender)
        {
            await InvokeVoidAsync("update", Id, GetDockViewConfig());
        }
    }

    /// <summary>
    /// <inheritdoc />
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, GetDockViewConfig());

    private DockViewConfig GetDockViewConfig() => new()
    {
        EnableLocalStorage = IsEnableLocalStorage,
        LocalStorageKey = LocalStorageKey,
        IsLock = IsLock,
        ShowLock = ShowLock,
        IsFloating = IsFloating,
        ShowFloat = ShowFloat,
        ShowClose = ShowClose,
        ShowPin = ShowPin,
        ShowMaximize = ShowMaximize,
        Renderer = Renderer,
        LayoutConfig = LayoutConfig,
        Theme = Theme.ToDescriptionString(),
        InitializedCallback = nameof(InitializedCallbackAsync),
        PanelVisibleChangedCallback = nameof(PanelVisibleChangedCallbackAsync),
        LockChangedCallback = nameof(LockChangedCallbackAsync),
        SplitterCallback = nameof(SplitterCallbackAsync),
        Contents = _components,
        LoadTabs = nameof(LoadTabs)
    };

    private bool IsEnableLocalStorage => EnableLocalStorage ?? _options.EnableLocalStorage ?? false;

    private string? LocalStorageKey => IsEnableLocalStorage ? $"{GetPrefixKey()}-{Name}-{GetVersion()}" : null;

    private string GetVersion() => Version ?? _options.Version ?? "v1";

    private string GetPrefixKey() => LocalStoragePrefix ?? _options.LocalStoragePrefix ?? "bb-dockview";

    /// <summary>
    /// <para lang="zh">重置为默认布局</para>
    /// <para lang="en">Resets to the default layout</para>
    /// </summary>
    public async Task Reset(string? layoutConfig = null)
    {
        var options = GetDockViewConfig();
        if (layoutConfig != null)
        {
            options.LayoutConfig = layoutConfig;
        }
        await InvokeVoidAsync("reset", Id, options);
    }

    /// <summary>
    /// <para lang="zh">获得 当前布局 JSON 字符串</para>
    /// <para lang="en">Gets the current layout JSON string</para>
    /// </summary>
    public Task<string?> SaveLayout() => InvokeAsync<string>("save", Id);

    private Task OnThemeChangedAsync(string themeName)
    {
        Theme = themeName == "dark" ? DockViewTheme.Dark : DockViewTheme.Light;
        return Task.CompletedTask;
    }

    /// <summary>
    /// <para lang="zh">初始化完成回调方法，由 JavaScript 调用</para>
    /// <para lang="en">Initialization callback method called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public async Task InitializedCallbackAsync()
    {
        if (OnInitializedCallbackAsync != null)
        {
            await OnInitializedCallbackAsync();
        }
    }

    /// <summary>
    /// <para lang="zh">标签页可见状态变更回调方法，由 JavaScript 调用</para>
    /// <para lang="en">Tab visibility state change callback method called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public async Task PanelVisibleChangedCallbackAsync(string key, bool status)
    {
        // 同步更新组件可见状态
        if (_componentStates.TryGetValue(key, out var state))
        {
            state.Visible = status;

            // 同步可见状态到组件实例
            state.Component.SetVisible(status);
        }

        // 通知订阅者
        if (OnVisibleStateChangedAsync != null)
        {
            await OnVisibleStateChangedAsync(key, status);
        }
    }

    /// <summary>
    /// <para lang="zh">锁定状态变更回调方法，由 JavaScript 调用</para>
    /// <para lang="en">Lock state change callback method called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public async Task LockChangedCallbackAsync(string[] panels, bool locked)
    {
        // 同步更新组件锁定状态
        foreach (var panel in panels)
        {
            if (_componentStates.TryGetValue(panel, out var state))
            {
                state.IsLock = locked;

                // 同步可见状态到组件实例
                state.Component.SetLock(locked);
            }
        }

        // 通知订阅者
        if (OnLockChangedCallbackAsync != null)
        {
            await OnLockChangedCallbackAsync(panels, locked);
        }
    }

    /// <summary>
    /// <para lang="zh">分割器回调方法，由 JavaScript 调用</para>
    /// <para lang="en">Splitter callback method called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public async Task SplitterCallbackAsync()
    {
        if (OnSplitterCallbackAsync != null)
        {
            await OnSplitterCallbackAsync();
        }
    }

    private HashSet<string> _loadTabs = new();

    /// <summary>
    /// <para lang="zh">加载指定标签页的方法，由 JavaScript 调用</para>
    /// <para lang="en">Method that loads the specified tabs, called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public Task LoadTabs(List<string> tabs)
    {
        // 注意渲染方式 DockViewRenderMode 为 DockViewRenderMode.OnlyWhenVisible 时此逻辑生效
        _loadTabs = tabs.ToHashSet();
        foreach (var componnet in _componentStates)
        {
            // 标记是否渲染
            componnet.Value.Render = tabs.Contains(componnet.Key);
        }
        StateHasChanged();

        return Task.CompletedTask;
    }

    internal void AddComponentState(DockViewComponentState state)
    {
        if (Renderer == DockViewRenderMode.Always)
        {
            return;
        }

        if (!string.IsNullOrEmpty(state.Key))
        {
            _componentStates.TryAdd(state.Key, state);
        }
    }

    internal void RemoveComponentState(string? key)
    {
        if (Renderer == DockViewRenderMode.Always)
        {
            return;
        }

        if (!string.IsNullOrEmpty(key))
        {
            _componentStates.TryRemove(key, out _);
        }
    }

    internal void UpdateComponentState(string? key, bool visible, bool? isLock)
    {
        if (Renderer == DockViewRenderMode.Always)
        {
            return;
        }

        if (!string.IsNullOrEmpty(key) && _componentStates.TryGetValue(key, out var state))
        {
            state.Visible = visible;
            state.IsLock = isLock;
        }
    }

    internal bool IsRender(string? key) => Renderer switch
    {
        DockViewRenderMode.OnlyWhenVisible => GetComponentState(key)?.IsRender() ?? false,
        _ => true
    };

    private DockViewComponentState? GetComponentState(string? key)
    {
        DockViewComponentState? state = null;
        if (Renderer == DockViewRenderMode.OnlyWhenVisible)
        {
            if (!string.IsNullOrEmpty(key) && _componentStates.TryGetValue(key, out var _state))
            {
                state = _state;
            }
        }

        return state;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="disposing"></param>
    /// <returns></returns>
    protected override ValueTask DisposeAsync(bool disposing)
    {
        if (disposing)
        {
            ThemeProviderService.ThemeChangedAsync -= OnThemeChangedAsync;
        }

        return base.DisposeAsync(disposing);
    }
}
