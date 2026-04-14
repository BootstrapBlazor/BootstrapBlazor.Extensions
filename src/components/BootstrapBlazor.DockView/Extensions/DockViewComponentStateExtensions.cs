// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

static class DockViewComponentStateExtensions
{
    extension(DockViewComponentState? state)
    {
        /// <summary>
        /// <para lang="zh">判断组件是否需要渲染</para>
        /// <para lang="en">Determine whether the component needs to be rendered</para>
        /// </summary>
        public bool IsRender()
        {
            // 如果组件 Visible false 表示组件不可见，此时 Render 也不需要渲染
            var render = false;
            if (state != null)
            {
                // 组件必须可见并且 Active 时才需要渲染
                render = state.Render && state.Visible;
            }
            return render;
        }
    }
}
