// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;

namespace BootstrapBlazor.Components;

/// <summary>
/// DockViewV2 组件
/// </summary>
public partial class DockViewV2 : IDisposable
{
    /// <summary>
    /// <para lang="zh">获得/设置 DockView 名称 默认 null 用于本地存储识别</para>
    /// <para lang="en">Gets or sets the DockView name. Default is null, used for local storage identification.</para>
    /// </summary>
    [Parameter]
    [EditorRequired]
    [NotNull]
    public string? Name { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 布局配置</para>
    /// <para lang="en">Gets or sets the layout configuration.</para>
    /// </summary>
    [Parameter]
    public string? LayoutConfig { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示关闭按钮 默认为 true</para>
    /// <para lang="en">Gets or sets whether to show the close button. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowClose { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否锁定 默认 false</para>
    /// <para lang="en">Gets or sets whether to lock. Default is false.</para>
    /// </summary>
    /// <remarks>锁定后无法拖动</remarks>
    [Parameter]
    public bool IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示锁定按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether to show the lock button. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowLock { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示最大化按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether to show the maximize button. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowMaximize { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否悬浮 默认 false</para>
    /// <para lang="en">Gets or sets whether to float. Default is false.</para>
    /// </summary>
    [Parameter]
    public bool IsFloating { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示可悬浮按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether to show the float button. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowFloat { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示显示图钉按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether to show the pin button. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowPin { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 客户端渲染模式 默认 <see cref="DockViewRenderMode.OnlyWhenVisible"/> 客户端默认使用 always onlyWhenVisible 值</para>
    /// <para lang="en">Gets or sets the client render mode. Default is <see cref="DockViewRenderMode.OnlyWhenVisible"/>. The client defaults to using always onlyWhenVisible values.</para>
    /// </summary>
    [Parameter]
    public DockViewRenderMode Renderer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 锁定状态回调此方法</para>
    /// <para lang="en">Gets or sets the callback method for lock state changes.</para>
    /// </summary>
    [Parameter]
    public Func<string[], bool, Task>? OnLockChangedCallbackAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标签关闭时回调此方法</para>
    /// <para lang="en">Gets or sets the callback method for when a tab is closed.</para>
    /// </summary>
    /// <remarks>可用于第三方组件显示标签页状态更新</remarks>
    [Parameter]
    public Func<string, bool, Task>? OnVisibleStateChangedAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标签页调整大小完成时回调此方法</para>
    /// <para lang="en">Gets or sets the callback method for when a tab is resized.</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnSplitterCallbackAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 客户端组件脚本初始化完成后回调此方法</para>
    /// <para lang="en">Gets or sets the callback method for when the client component script initialization is complete.</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnInitializedCallbackAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件</para>
    /// <para lang="en">Gets or sets the child components.</para>
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 版本设置 默认 null 未设置 用于本地配置 可通过全局统一配置</para>
    /// <para lang="en">Gets or sets the version. Default is null. Used for local configuration and can be configured globally.</para>
    /// </summary>
    [Parameter]
    public string? Version { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否启用本地存储布局 默认 null 未设置</para>
    /// <para lang="en">Gets or sets whether to enable local storage layout. Default is null. Not set.</para>
    /// </summary>
    [Parameter]
    public bool? EnableLocalStorage { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 本地存储前缀 默认 bb-dock</para>
    /// <para lang="en">Gets or sets the local storage prefix. Default is bb-dock.</para>
    /// </summary>
    [Parameter]
    public string? LocalStoragePrefix { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 DockView 组件主题 默认 Light</para>
    /// <para lang="en">Gets or sets the DockView component theme. Default is Light.</para>
    /// </summary>
    [Parameter]
    public DockViewTheme Theme { get; set; } = DockViewTheme.Light;

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
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (!firstRender)
        {
            await InvokeVoidAsync("update", Id, GetOptions());
        }
    }

    /// <summary>
    /// <inheritdoc />
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, GetOptions());

    private DockViewConfig GetOptions() => new()
    {
        EnableLocalStorage = EnableLocalStorage ?? _options.EnableLocalStorage ?? false,
        LocalStorageKey = $"{GetPrefixKey()}-{Name}-{GetVersion()}",
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

    private string GetVersion() => Version ?? _options.Version ?? "v1";

    private string GetPrefixKey() => LocalStoragePrefix ?? _options.LocalStoragePrefix ?? "bb-dockview";

    /// <summary>
    /// <para lang="zh">重置为默认布局</para>
    /// <para lang="en">Resets to the default layout.</para>
    /// </summary>
    /// <returns></returns>
    public async Task Reset(string? layoutConfig = null)
    {
        var options = GetOptions();
        if (layoutConfig != null)
        {
            options.LayoutConfig = layoutConfig;
        }
        await InvokeVoidAsync("reset", Id, options);
    }

    /// <summary>
    /// <para lang="zh">获得当前布局 Json 字符串</para>
    /// <para lang="en">Gets the current layout JSON string.</para>
    /// </summary>
    /// <returns></returns>
    public Task<string?> SaveLayout() => InvokeAsync<string?>("save", Id);

    private Task OnThemeChangedAsync(string themeName)
    {
        Theme = themeName == "dark" ? DockViewTheme.Dark : DockViewTheme.Light;
        return Task.CompletedTask;
    }

    /// <summary>
    /// <para lang="zh">标签页关闭回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Tab close callback method called by JavaScript</para>
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
    /// <para lang="zh">标签页关闭回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Tab close callback method called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public async Task PanelVisibleChangedCallbackAsync(string title, bool status)
    {
        if (OnVisibleStateChangedAsync != null)
        {
            await OnVisibleStateChangedAsync(title, status);
        }
    }

    private HashSet<string> _loadTabs = new();

    /// <summary>
    /// <para lang="zh">加载指定的标签页 由 JavaScript 调用</para>
    /// <para lang="en">Loads the specified tabs called by JavaScript</para>
    /// </summary>
    /// <param name="tabs"></param>
    [JSInvokable]
    public Task LoadTabs(List<string> tabs)
    {
        // 客户端请求渲染当前激活的标签
        _loadTabs.Clear();
        foreach (var tab in tabs)
        {
            _loadTabs.Add(tab);
        }

        StateHasChanged();
        return Task.CompletedTask;
    }

    /// <summary>
    /// <para lang="zh">检查指定 Key 值 DockviewComponent 是否处于激活状态</para>
    /// <para lang="en">Checks whether the DockviewComponent with the specified key is active.</para>
    /// </summary>
    /// <param name="key"></param>
    public bool ShowTab(string? key)
    {
        // TODO: Partial 模式下使用临时回滚稍后完善
        if (Renderer == DockViewRenderMode.Always)
        {
            return true;
        }

        return _loadTabs.Contains(key ?? string.Empty);
    }

    /// <summary>
    /// <para lang="zh">锁定回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Lock callback method called by JavaScript</para>
    /// </summary>
    [JSInvokable]
    public async Task LockChangedCallbackAsync(string[] panels, bool state)
    {
        if (OnLockChangedCallbackAsync != null)
        {
            await OnLockChangedCallbackAsync(panels, state);
        }
    }

    /// <summary>
    /// <para lang="zh">分割器回调方法 由 JavaScript 调用</para>
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

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            ThemeProviderService.ThemeChangedAsync -= OnThemeChangedAsync;
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
