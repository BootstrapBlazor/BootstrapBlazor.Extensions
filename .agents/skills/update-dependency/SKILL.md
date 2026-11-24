---
name: update-dependency
description: >-
  按依赖参数检查或更新 BootstrapBlazor.Extensions 的组件依赖，并按用户授权验证和交付。
  适用于更新 dom2image、tableexport、driverjs、html2pdf 等已登记组件的 npm 内嵌产物或 NuGet 包。
---

# 更新组件依赖

## 确定交付范围

按用户请求确定操作范围。仅检查版本时，比较并报告版本后结束，不修改仓库文件。仅准备改动时，完成更新、构建和差异核对后结束，不提交、推送或创建 PR。提交、推送和创建或更新 PR 按用户授权执行；授权不明确时，停在已授权的步骤并说明。

## 选择依赖

调用时传入映射表中的参数，例如 `$update-dependency dom2image`。缺少参数或参数未知时，列出表内可用选项并请用户选择。包名、当前版本或新版产物无法核实，或者发布包的入口与映射不符时，说明缺少的证据并询问用户，暂停更新。

| 参数 | 依赖类型 | 包名 | 需替换或升级的文件（相对于仓库根目录） | 版本号记录位置 | 提交标题中的组件和库 |
| --- | --- | --- | --- | --- | --- |
| `dom2image` | npm 内嵌产物 | `@zumer/snapdom` | `src/components/BootstrapBlazor.Dom2Image/wwwroot/lib/snapdom.mjs`，取 npm 归档内的 `package/dist/snapdom.mjs`；`src/components/BootstrapBlazor.Dom2Image/BootstrapBlazor.Dom2Image.csproj` | 依赖版本见 `snapdom.mjs` 文件头的 `vX.Y.Z`。组件 `.csproj` 的 `<Version>` 增加一个 patch 版本。 | `Dom2Image` / `SnapDOM` |
| `tableexport` | NuGet 包 | `MiniExcel` | `src/components/BootstrapBlazor.TableExport/BootstrapBlazor.TableExport.csproj` | 同一 `.csproj` 中，`net8.0` 至 `net11.0` 的 `PackageReference` 共用 `<MiniExcelVersion>`，`net6.0` 和 `net7.0` 的 `PackageReference` 各自固定为 `1.47.1`。组件 `<Version>` 增加一个 patch 版本。 | `TableExport` / `MiniExcel` |
| `driverjs` | npm 内嵌产物 | `driver.js` | `src/components/BootstrapBlazor.DriverJs/wwwroot/driver.js.mjs` 和 `src/components/BootstrapBlazor.DriverJs/wwwroot/driver.css`，分别取同一 npm 归档内的 `package/dist/driver.js.mjs` 和 `package/dist/driver.css`；`src/components/BootstrapBlazor.DriverJs/BootstrapBlazor.DriverJs.csproj` | 从最近一次更新这两份产物的依赖提交标题读取版本，并与对应 npm 归档的两份产物核对。组件 `.csproj` 的 `<Version>` 增加一个 patch 版本。 | `DriverJs` / `DriverJs` |
| `html2pdf` | NuGet 包 | `PuppeteerSharp` | `src/components/BootstrapBlazor.Html2Pdf/BootstrapBlazor.Html2Pdf.csproj`。范围仅限主项目，Playwright 和 Select 的依赖独立维护，当前分支未包含 QuestPdf 项目。 | 同一 `.csproj` 中，`net8.0` 至 `net11.0` 的 `PackageReference` 共用 `<PuppeteerSharpVersion>`，`net6.0` 和 `net7.0` 的 `PackageReference` 各自固定为 `20.2.6`。组件 `<Version>` 增加一个 patch 版本。 | `Html2Pdf` / `PuppeteerSharp` |

新增条目时，从仓库引用和官方发布源核实包名，登记参数、依赖类型、目标文件、版本记录位置及提交标题用名。注明用于构建的组件项目及各目标框架的版本约束，并同步下面的参数选择。npm 条目还须登记归档中的产物路径。

从仓库根目录开启 PowerShell 7，将 `$dep` 设为用户指定的参数，在同一会话中按交付范围运行各节的示例。

```powershell
$targetVersion = $null
$dep = 'dom2image' # 可选 dom2image、driverjs、tableexport、html2pdf
$dependencies = @{
    dom2image = @{
        Component = 'Dom2Image'
        Package = '@zumer/snapdom'
        Artifacts = @{ 'package/dist/snapdom.mjs' = 'wwwroot/lib/snapdom.mjs' }
    }
    driverjs = @{
        Component = 'DriverJs'
        Package = 'driver.js'
        Artifacts = @{
            'package/dist/driver.js.mjs' = 'wwwroot/driver.js.mjs'
            'package/dist/driver.css' = 'wwwroot/driver.css'
        }
    }
    tableexport = @{
        Component = 'TableExport'
        Package = 'MiniExcel'
        VersionProperty = 'MiniExcelVersion'
    }
    html2pdf = @{
        Component = 'Html2Pdf'
        Package = 'PuppeteerSharp'
        VersionProperty = 'PuppeteerSharpVersion'
    }
}
$dependency = $dependencies[$dep]
if (-not $dependency) { throw "可用参数为 $($dependencies.Keys | Sort-Object)" }
$packageName = $dependency.Package
$component = $dependency.Component
$componentDir = "src/components/BootstrapBlazor.$component"
$projectPath = "$componentDir/BootstrapBlazor.$component.csproj"
git status --short
```

## 查询并比较版本

读取当前依赖版本，再查询所选包的最新版本。NuGet 包的常规更新以映射中的共享版本属性为比较基准，旧框架使用各自的固定版本。

```powershell
function Expand-NpmRelease {
    param($Name, $Version, $ArtifactPaths)

    $tempDir = Join-Path ([IO.Path]::GetTempPath()) ('dependency-' + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $tempDir -ErrorAction Stop | Out-Null
    $packOutput = npm pack "${Name}@$Version" --json --ignore-scripts --pack-destination $tempDir --registry https://registry.npmjs.org/
    if ($LASTEXITCODE -ne 0) { throw "下载 $Name $Version 的发布归档失败" }
    $archive = Join-Path $tempDir ($packOutput | ConvertFrom-Json).filename
    tar -xzf $archive -C $tempDir package/package.json @ArtifactPaths
    if ($LASTEXITCODE -ne 0) { throw "无法从发布归档提取 $Name 的产物" }

    $manifest = Get-Content -Raw -LiteralPath (Join-Path $tempDir 'package/package.json') -ErrorAction Stop | ConvertFrom-Json
    if ($manifest.name -cne $Name -or $manifest.version -cne $Version) {
        throw "发布清单与 $Name $Version 不符"
    }
    $tempDir
}

$targetVersion = $null
if ($dependency.Artifacts) {
    $artifactPaths = @($dependency.Artifacts.Keys)
    if ($dep -eq 'dom2image') {
        $modulePath = Join-Path $componentDir $dependency.Artifacts[$artifactPaths[0]]
        $header = (Get-Content -LiteralPath $modulePath -TotalCount 5 -ErrorAction Stop) -join [Environment]::NewLine
        $versionMatch = [regex]::Match($header, '(?m)^\s*\*\s+v(?<version>\S+)')
        $currentVersion = $versionMatch.Groups['version'].Value
    } else {
        $repoArtifacts = @($dependency.Artifacts.Values | ForEach-Object { "$componentDir/$_" })
        $subject = git log -1 --format=%s --extended-regexp '--grep=^feat\(DriverJs\): update DriverJs to v' -- @repoArtifacts
        if ($LASTEXITCODE -ne 0 -or $subject -notmatch 'to v(?<version>\S+)') {
            throw '无法从提交记录确认 DriverJs 版本'
        }
        $currentVersion = $Matches['version']
        $publishedDir = Expand-NpmRelease $packageName $currentVersion $artifactPaths
        foreach ($artifact in $artifactPaths) {
            $published = Get-Content -Raw -LiteralPath (Join-Path $publishedDir $artifact) -ErrorAction Stop
            $local = Get-Content -Raw -LiteralPath (Join-Path $componentDir $dependency.Artifacts[$artifact]) -ErrorAction Stop
            if (($published -replace '\r(?=\n)') -cne ($local -replace '\r(?=\n)')) {
                throw "仓库中的 $artifact 与 $packageName $currentVersion 的发布产物不符"
            }
        }
    }

    $npmResult = npm view "${packageName}@latest" name version dist.tarball --json --registry https://registry.npmjs.org/
    if ($LASTEXITCODE -ne 0) { throw "查询 $packageName 失败" }
    $release = $npmResult | ConvertFrom-Json
    if ($release.name -cne $packageName) { throw "无法核实 npm 包 $packageName" }
    $latestVersion = $release.version
} else {
    [xml]$project = Get-Content -Raw -LiteralPath $projectPath -ErrorAction Stop
    $currentVersion = $project.SelectSingleNode("/Project/PropertyGroup/$($dependency.VersionProperty)").InnerText
    $nugetQuery = [uri]::EscapeDataString("packageid:$packageName")
    $nugetResult = Invoke-RestMethod "https://azuresearch-usnc.nuget.org/query?q=$nugetQuery&prerelease=false" -ErrorAction Stop
    $latestVersion = ($nugetResult.data | Where-Object { $_.id -eq $packageName }).version
}

if (-not $currentVersion -or -not $latestVersion) { throw "无法核实 $packageName 的当前版本或最新版本" }
"$packageName 当前为 $currentVersion，发布源最新为 $latestVersion"
if ([semver]$latestVersion -gt [semver]$currentVersion) { $targetVersion = $latestVersion }
```

版本相同或仓库版本更高时，`$targetVersion` 为空，报告两个版本并结束流程。只有确认存在更新且适用的版本后才修改文件。

## 更新文件

依赖实际更新后，将组件 `.csproj` 中 `<Version>` 的 patch 段增加一次。接续已有更新时，先检查差异，避免重复递增。

### npm 内嵌产物

使用已核实的包名和目标版本从 npm registry 下载 `.tgz`，将归档中的 `package.json` 和映射指定的产物提取到系统临时目录。核对清单中的包名、版本和产物入口。SnapDOM 的 `dom2image.js` 使用 `snapdom` 导出，还需核对模块的文件头版本。DriverJs 的 `DriverJs.razor.js` 使用 `driver` 导出，组件另行加载 `driver.css`。两个文件都核实后，使用同一份归档中的模块和样式一并替换。

```powershell
if ($targetVersion -and $dependency.Artifacts) {
    $npmTemp = Expand-NpmRelease $packageName $targetVersion $artifactPaths
    foreach ($artifact in $artifactPaths) {
        [pscustomobject]@{
            Source = Join-Path $npmTemp $artifact
            Destination = Join-Path $componentDir $dependency.Artifacts[$artifact]
        }
    }
}
```

核实后将所有提取的产物按原内容复制到映射中的目标文件。保留产物的文件头、许可证和导出。

### NuGet 包

核对新版 NuGet 包支持的目标框架。TableExport 和 Html2Pdf 的常规更新是在 `$projectPath` 中找到 `$dependency.VersionProperty` 指定的共享属性，将它更新为 `$targetVersion`，覆盖 `net8.0` 至 `net11.0`。若涉及 `net6.0` 或 `net7.0` 的固定版本，先核实这些目标框架支持的包版本和现有 API。

跨 NuGet 大版本时，检查发布说明和调用点。若需要 API 适配或编译失败，报告版本跨度、受影响的框架及 API、已取得的构建结果，暂停并等待人工确认适配范围。`7397bf2b` 将 MiniExcel 升至 `2.0.0` 时同时修改了 `Services/DefaultTableExport.cs` 并删除了 `Services/ExportDataReader.cs`。人工确认后，按约定范围适配并重新构建。

## 构建和核对差异

根据所选参数运行对应的 `dotnet build`，覆盖项目声明的所有目标框架。构建失败时记录错误并暂停提交和 PR。

```powershell
if ($targetVersion) {
    dotnet build $projectPath
    if ($LASTEXITCODE -ne 0) { throw "组件构建失败 $projectPath" }
}
```

构建通过后，用 `git diff --check` 和 `git diff -- <本次涉及的路径>` 核对依赖产物或版本、组件版本以及经确认的适配改动。

## 提交和 PR

按 `feat(<Component>): update <Lib> to vX.Y.Z` 生成提交信息。组件名和库名用映射表中的写法，版本号用此次更新的依赖版本。例如 `feat(Dom2Image): update SnapDOM to v3.8.3`。

构建通过且差异核对完成后，仅按用户授权提交、推送和创建或复用 PR。返回依赖版本变化、实际构建结果和已创建或复用的 PR 链接；PR 保持待审，禁止自动合并。[github-issue-pr 技能](../github-issue-pr/SKILL.md)
