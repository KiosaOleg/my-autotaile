# SSH Tunnel для підключення до MySQL через bastion host (PowerShell)
# Використання: .\scripts\ssh-tunnel.ps1 [SSH_USER]

param(
    [string]$SSH_USER = "root"  # За замовчуванням root
)

$SSH_HOST = "212.162.152.33"
$LOCAL_PORT = 3307
$REMOTE_HOST = "127.0.0.1"
$REMOTE_PORT = 3306

Write-Host "🔐 Створюю SSH тунель..." -ForegroundColor Cyan
Write-Host "   Локальний порт: $LOCAL_PORT"
Write-Host "   Віддалений сервер: $SSH_HOST"
Write-Host "   MySQL на сервері: $REMOTE_HOST:$REMOTE_PORT"
Write-Host ""
Write-Host "⚠️  Тунель працюватиме до натискання Ctrl+C" -ForegroundColor Yellow
Write-Host "   Залиште цей термінал відкритим під час роботи з Prisma"
Write-Host ""

# Використовуємо ssh з Git Bash або WSL
$sshCommand = "ssh -N -L ${LOCAL_PORT}:${REMOTE_HOST}:${REMOTE_PORT} ${SSH_USER}@${SSH_HOST}"

# Перевіряємо, чи доступний ssh
if (Get-Command ssh -ErrorAction SilentlyContinue) {
    Invoke-Expression $sshCommand
} else {
    Write-Host "❌ SSH не знайдено. Встановіть Git Bash або використайте WSL." -ForegroundColor Red
    Write-Host "   Або запустіть скрипт через Git Bash: bash scripts/ssh-tunnel.sh" -ForegroundColor Yellow
}
