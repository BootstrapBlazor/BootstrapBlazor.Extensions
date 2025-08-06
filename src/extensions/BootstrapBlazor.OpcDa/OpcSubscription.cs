// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

class OpcSubscription(Opc.Da.ISubscription subscription) : IOpcSubscription
{
    public Action<List<OpcReadItem>>? DataChanged { get; set; }

    public bool KeepLastValue { get; set; }

    public string Name => subscription.GetState().Name;

    public Opc.Da.ISubscription GetSubscription() => subscription;

    private readonly List<OpcReadItem> _cache = [];

    public void AddItems(IEnumerable<string> items)
    {
        subscription.AddItems([.. items.Select(i => new Opc.Da.Item { ItemName = i })]);

        subscription.DataChanged += (_, _, values) =>
        {
            var valueList = values.Select(i =>
            {
                var item = new OpcReadItem()
                {
                    Name = i.ItemName,
                    Value = i.Value,
                    Quality = i.Quality == Opc.Da.Quality.Good ? Quality.Good : Quality.Bad,
                    Timestamp = i.Timestamp
                };
                if (KeepLastValue)
                {
                    var v = _cache.Find(opcItem => opcItem.Name == item.Name);
                    item.LastValue = v.Value;
                }
                return item;
            }).ToList();

            _cache.Clear();
            _cache.AddRange(valueList);

            DataChanged?.Invoke(valueList);
        };
    }
}
