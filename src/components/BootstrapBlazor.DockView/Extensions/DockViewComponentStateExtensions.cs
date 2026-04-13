// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

static class DockViewComponentStateExtensions
{
    extension(DockViewComponentState? state)
    {
        public bool IsRender()
        {
            var render = false;
            if (state != null)
            {
                render = state.Render && state.Visible;
            }
            return render;
        }

        public object? GetComponentState(DockViewComponent component)
        {
            if (state == null)
            {
                return null;
            }

            return new
            {
                component.Class,
                component.Height,
                component.Id,
                component.IsFloating,
                IsLock = state.IsLock,
                component.Key,
                component.ShowClose,
                component.ShowFloat,
                component.ShowLock,
                component.ShowMaximize,
                component.Title,
                component.TitleClass,
                component.TitleWidth,
                component.Type,
                Visible = state.Visible,
                component.Width
            };
        }
    }
}
