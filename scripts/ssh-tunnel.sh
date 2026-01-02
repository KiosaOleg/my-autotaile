#!/bin/bash
# SSH Tunnel для підключення до MySQL через bastion host
# Використання: ./scripts/ssh-tunnel.sh [SSH_USER]

SSH_USER=${1:-"root"}  # За замовчуванням root, можна передати як аргумент
SSH_HOST="212.162.152.33"
LOCAL_PORT=3307
REMOTE_HOST="127.0.0.1"
REMOTE_PORT=3306

echo "🔐 Створюю SSH тунель..."
echo "   Локальний порт: $LOCAL_PORT"
echo "   Віддалений сервер: $SSH_HOST"
echo "   MySQL на сервері: $REMOTE_HOST:$REMOTE_PORT"
echo ""
echo "⚠️  Тунель працюватиме до натискання Ctrl+C"
echo "   Залиште цей термінал відкритим під час роботи з Prisma"
echo ""

ssh -N -L ${LOCAL_PORT}:${REMOTE_HOST}:${REMOTE_PORT} ${SSH_USER}@${SSH_HOST}
