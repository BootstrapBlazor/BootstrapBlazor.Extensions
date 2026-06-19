# BootstrapBlazor Repository Sync Script
# This script ensures the BootstrapBlazor component repository is cloned and up-to-date

param(
    [string]$DataDirectory = ".mcp-data",
    [string]$RepoUrl = "https://github.com/dotnetcore/BootstrapBlazor.git",
    [string]$Branch = "main",
    [switch]$Update
)

$ErrorActionPreference = "Stop"

$RepoPath = Join-Path $DataDirectory "BootstrapBlazor"

function Test-GitRepository {
    param([string]$Path)
    return Test-Path (Join-Path $Path ".git")
}

function Clone-Repository {
    Write-Host "Cloning BootstrapBlazor repository..." -ForegroundColor Cyan

    if (-not (Test-Path $DataDirectory)) {
        New-Item -ItemType Directory -Path $DataDirectory -Force | Out-Null
    }

    git clone --depth 1 --branch $Branch $RepoUrl $RepoPath

    if ($LASTEXITCODE -ne 0) {
        throw "Failed to clone repository"
    }

    Write-Host "Repository cloned successfully to: $RepoPath" -ForegroundColor Green
}

function Update-Repository {
    Write-Host "Updating BootstrapBlazor repository..." -ForegroundColor Cyan

    Push-Location $RepoPath
    try {
        $beforeCommit = git rev-parse HEAD
        git pull origin $Branch

        if ($LASTEXITCODE -ne 0) {
            throw "Failed to update repository"
        }

        $afterCommit = git rev-parse HEAD

        if ($beforeCommit -eq $afterCommit) {
            Write-Host "Repository is already up-to-date" -ForegroundColor Green
        } else {
            Write-Host "Repository updated to commit: $afterCommit" -ForegroundColor Green
        }
    }
    finally {
        Pop-Location
    }
}

# Main logic
if (-not (Test-Path $RepoPath)) {
    Clone-Repository
}
elseif (-not (Test-GitRepository $RepoPath)) {
    throw "Directory exists but is not a git repository: $RepoPath"
}
elseif ($Update) {
    Update-Repository
}
else {
    Write-Host "Repository already exists at: $RepoPath" -ForegroundColor Green
    Write-Host "Use -Update to pull latest changes" -ForegroundColor Yellow
}

# Verify key paths
$ComponentsPath = Join-Path $RepoPath "src\BootstrapBlazor\Components"
$SamplesPath = Join-Path $RepoPath "src\BootstrapBlazor.Server\Components\Samples"

Write-Host "`nVerifying repository structure:" -ForegroundColor Cyan
Write-Host "  Components: $(if (Test-Path $ComponentsPath) { 'OK' } else { 'MISSING' })" -ForegroundColor $(if (Test-Path $ComponentsPath) { 'Green' } else { 'Red' })
Write-Host "  Samples: $(if (Test-Path $SamplesPath) { 'OK' } else { 'MISSING' })" -ForegroundColor $(if (Test-Path $SamplesPath) { 'Green' } else { 'Red' })
