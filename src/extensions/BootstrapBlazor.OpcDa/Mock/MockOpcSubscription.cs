// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

sealed class MockOpcDaSubscription : IOpcSubscription, IDisposable
{
    private readonly int _updateRate;
    private readonly bool _active;
    private readonly List<string> _items = [];
    private CancellationTokenSource? _cts;

    public MockOpcDaSubscription(string name, int updateRate = 1000, bool active = true)
    {
        Name = name;
        _updateRate = updateRate;
        _active = active;

        _cts = new CancellationTokenSource();
        _ = Task.Run(() => DoTask(_cts.Token));
    }

    public string Name { get; }

    public bool KeepLastValue { get; set; }

    public Action<List<OpcReadItem>>? DataChanged { get; set; }

    public void AddItems(IEnumerable<string> items)
    {
        _items.AddRange(items);
    }

    private void UpdateValues()
    {
        if (DataChanged != null)
        {
            var values = _items.Select(i => new OpcReadItem(i, Quality.Good, DateTime.Now, Random.Shared.Next(1000, 2000))).ToList();
            DataChanged.Invoke(values);
        }
    }

    private async Task DoTask(CancellationToken token)
    {
        do
        {
            try
            {
                if (_active)
                {
                    UpdateValues();
                }

                await Task.Delay(_updateRate, token);
            }
            catch (OperationCanceledException)
            {
                // ignored
            }
        }
        while (!token.IsCancellationRequested);
    }

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            if (_cts != null)
            {
                _cts.Cancel();
                _cts.Dispose();
                _cts = null;
            }
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
