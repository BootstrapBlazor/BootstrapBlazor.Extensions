#if NET6_0 || NET7_0
// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Extensions;
using MiniExcelLibs;
using System.Data;

namespace BootstrapBlazor.Components;

class ExportDataReader<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn> cols, TableExportOptions options, ILookupService lookupService) : MiniExcelDataReaderBase
{
    private int _rowIndex = -1;
    private readonly IEnumerable<TModel> _rows = items;
    private readonly IEnumerable<ITableColumn> _columns = cols;
    private readonly TableExportOptions _options = options;
    private readonly int _rowCount = items.Count();

    public override object this[int i]
    {
        get
        {
            object? ret = null;
            var row = _rows.ElementAtOrDefault(_rowIndex);
            if (row != null)
            {
                ret = _columns.ElementAtOrDefault(i);
            }
            return ret!;
        }
    }

    public override object this[string name]
    {
        get
        {
            object? ret = null;
            var row = _rows.ElementAtOrDefault(_rowIndex);
            if (row != null)
            {
                ret = _columns.FirstOrDefault(i => i.GetFieldName() == name);
            }
            return ret!;
        }
    }

    public override int FieldCount { get; } = cols.Count();

    public override string GetName(int i)
    {
        var col = _columns.ElementAtOrDefault(i);
        return col?.GetDisplayName() ?? string.Empty;
    }

    public override object? GetValue(int i)
    {
        object? v = null;
        var row = _rows.ElementAtOrDefault(_rowIndex);
        var col = _columns.ElementAtOrDefault(i);
        if (row != null && col != null)
        {
            v = Utility.GetPropertyValue(row, col.GetFieldName());
        }
        return v;
    }

    public override async Task<object?> GetValueAsync(int i, CancellationToken cancellationToken)
    {
        object? v = GetValue(i);
        if (v != null)
        {
            var col = _columns.ElementAtOrDefault(i);
            if (col != null)
            {
                v = await col.FormatValueAsync(v, _options, lookupService);
            }
        }
        return v;
    }

    public override bool Read()
    {
        _rowIndex++;
        return _rowIndex < _rowCount;
    }
}
#endif
