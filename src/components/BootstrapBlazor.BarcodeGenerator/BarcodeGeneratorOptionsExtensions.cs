// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

static class BarcodeGeneratorOptionsExtensions
{
    /// <summary>
    /// 检查是否相同方法
    /// </summary>
    /// <param name="options"></param>
    /// <param name="source"></param>
    /// <returns></returns>
    public static bool DifferAndAssign(this BarcodeGeneratorOption options, BarcodeGeneratorOption? source)
    {
        var ret = false;
        if (source != null)
        {
            if (options.Format != source.Format)
            {
                options.Format = source.Format;
                ret = true;
            }
            if (options.Width != source.Width)
            {
                options.Width = source.Width;
                ret = true;
            }
            if (options.Height != source.Height)
            {
                options.Height = source.Height;
                ret = true;
            }
            if (options.DisplayValue != source.DisplayValue)
            {
                options.DisplayValue = source.DisplayValue;
                ret = true;
            }
            if (options.Text != source.Text)
            {
                options.Text = source.Text;
                ret = true;
            }
            if (options.FontOptions != source.FontOptions)
            {
                options.FontOptions = source.FontOptions;
                ret = true;
            }
            if (options.Font != source.Font)
            {
                options.Font = source.Font;
                ret = true;
            }
            if (options.TextAlign != source.TextAlign)
            {
                options.TextAlign = source.TextAlign;
                ret = true;
            }
            if (options.TextPosition != source.TextPosition)
            {
                options.TextPosition = source.TextPosition;
                ret = true;
            }
            if (options.TextMargin != source.TextMargin)
            {
                options.TextMargin = source.TextMargin;
                ret = true;
            }
            if (options.FontSize != source.FontSize)
            {
                options.FontSize = source.FontSize;
                ret = true;
            }
            if (options.Background != source.Background)
            {
                options.Background = source.Background;
                ret = true;
            }
            if (options.LineColor != source.LineColor)
            {
                options.LineColor = source.LineColor;
                ret = true;
            }
            if (options.Margin != source.Margin)
            {
                options.Margin = source.Margin;
                ret = true;
            }
            if (options.MarginTop != source.MarginTop)
            {
                options.MarginTop = source.MarginTop;
                ret = true;
            }
            if (options.MarginBottom != source.MarginBottom)
            {
                options.MarginBottom = source.MarginBottom;
                ret = true;
            }
            if (options.MarginLeft != source.MarginLeft)
            {
                options.MarginLeft = source.MarginLeft;
                ret = true;
            }
            if (options.MarginRight != source.MarginRight)
            {
                options.MarginRight = source.MarginRight;
                ret = true;
            }
            if (options.Flat != source.Flat)
            {
                options.Flat = source.Flat;
                ret = true;
            }
        }
        return ret;
    }
}
