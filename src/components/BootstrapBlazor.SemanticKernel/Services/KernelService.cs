// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Option;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Connectors.Ollama;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.Memory;
using System.Collections.Concurrent;
#pragma warning disable CS1998
namespace BootstrapBlazor.Components.Services;
/// <summary>
/// 管理语义内核的单例服务
/// </summary>
/// <param name="options">通过Configuration绑定的配置</param>
public class KernelService(KernelOptions options) : IKernelService
{
    private ConcurrentDictionary<string, Kernel> Kernels { get; } = [];
    private ConcurrentDictionary<string, ISemanticTextMemory> Memories { get; } = [];
    /// <summary>
    /// 新建或从缓存中获取一个语义内核
    /// </summary>
    /// <param name="config">配置名称</param>
    /// <param name="lifetime">生命周期，不为单例就会新建而不是从缓存中获取</param>
    /// <returns>语义内核</returns>
    /// <exception cref="ArgumentNullException">配置项未找到</exception>
    public async Task<Kernel?> CreateKernelAsync(string config = "Default", ServiceLifetime lifetime = ServiceLifetime.Singleton)
    {
        if (Kernels.TryGetValue(config, out var kernel) && lifetime == ServiceLifetime.Singleton) return kernel;
        var model = options.Configs.FirstOrDefault(c => c.ConfigName == config) ?? throw new ArgumentNullException($"model \"{config}\" is not configured in configuration!");
        var builder = Kernel.CreateBuilder();
        if (model.Provider == ChatModelsProvider.OpenAI)
        {
            if (string.IsNullOrEmpty(model.Endpoint))
                builder
                .AddOpenAIChatCompletion(model.ChatModel, model.ApiKey)
                .AddOpenAITextEmbeddingGeneration(model.EmbeddingsModel, model.ApiKey)
                .AddOpenAITextToImage(model.ApiKey);
            else
                builder
                    .AddOpenAIChatCompletion(model.ChatModel, new Uri(model.Endpoint), model.ApiKey)
                    .AddOpenAITextEmbeddingGeneration(model.EmbeddingsModel, model.ApiKey)
                    .AddOpenAITextToImage(model.ApiKey);
        }
        else if (model.Provider == ChatModelsProvider.AzureOpenAI)
        {
            builder
                .AddAzureOpenAIChatCompletion(
                    deploymentName: model.ChatModels.First(p => p.Value == model.ChatModel).Key,
                    modelId: model.ChatModel,
                    endpoint: model.Endpoint,
                    apiKey: model.ApiKey
                    )
                .AddAzureOpenAITextEmbeddingGeneration(
                    deploymentName: model.EmbeddingsModels.First(p => p.Value == model.EmbeddingsModel).Key,
                    modelId: model.EmbeddingsModel,
                    endpoint: model.Endpoint,
                    apiKey: model.ApiKey
                    );
        }
        else if (model.Provider == ChatModelsProvider.Ollama)
        {
            builder.AddOpenAIChatCompletion(model.ChatModel, new Uri(model.Endpoint), model.ApiKey ?? null);
        }
        kernel = builder.Build();
        if (lifetime == ServiceLifetime.Singleton) Kernels.TryAdd(config, kernel);
        return kernel;
    }
    /// <summary>
    /// 新建或从缓存中获取一个记忆存储
    /// </summary>
    /// <param name="config">配置名称</param>
    /// <param name="lifetime">生命周期，不为单例就会新建而不是从缓存中获取</param>
    /// <returns>记忆存储</returns>
    /// <exception cref="ArgumentNullException">配置项未找到</exception>
    public async Task<ISemanticTextMemory?> CreateMemoryStoreAsync(string config = "Default", ServiceLifetime lifetime = ServiceLifetime.Singleton)
    {
        if (Memories.TryGetValue(config, out var memory) && lifetime == ServiceLifetime.Singleton) return memory;
        var model = options.Configs.FirstOrDefault(c => c.ConfigName == config) ?? throw new ArgumentNullException($"model \"{config}\" is not configured in configuration!");
        if (model is null) return null;
        IMemoryStore memoryStore = null!;
        if (model.EmbeddingsProvider is not null && model.EmbeddingsProvider == EmbeddingsModelProvider.AzureOpenAI)
        {
            var generation = new AzureOpenAITextEmbeddingGenerationService(
                model.EmbeddingsModel,
                model.Endpoint,
                model.ApiKey
            );

            var mem = new MemoryBuilder()
                .WithTextEmbeddingGeneration(generation)
                .WithMemoryStore(memoryStore)
                .Build();
            Memories.TryAdd(config, mem);
            return mem;
        }

        if (model.EmbeddingsProvider is not null && model.EmbeddingsProvider == EmbeddingsModelProvider.OpenAI)
        {
            var mem = new MemoryBuilder()
                .WithOpenAITextEmbeddingGeneration(
                    modelId: model.EmbeddingsModel, model.ApiKey)
                .WithMemoryStore(memoryStore)
                .Build();
            Memories.TryAdd(config, mem);
            return mem;
        }

        if (model.EmbeddingsProvider is not null && model.EmbeddingsProvider == EmbeddingsModelProvider.Ollama)
        {
            var generation = new OllamaTextEmbeddingGenerationService(model.EmbeddingsModel, new Uri(model.Endpoint));
            var mem = new MemoryBuilder()
                .WithTextEmbeddingGeneration(generation)
                .WithMemoryStore(memoryStore)
                .Build();
            Memories.TryAdd(config, mem);
            return mem;
        }
        var nullmem = new MemoryBuilder()
            .WithMemoryStore(memoryStore)
            .Build();
        if (lifetime == ServiceLifetime.Singleton) Memories.TryAdd(config, nullmem);
        return nullmem;
    }
}
