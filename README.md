This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 20.16+
- SSH доступ до сервера `212.162.152.33`
- Git Bash (для Windows) або WSL

### Database Setup (SSH Tunnel)

Цей проект використовує SSH тунель для безпечного підключення до MySQL бази даних.

#### 1. Налаштуйте .env файл

```bash
cp .env.example .env
```

Відредагуйте `.env` та встановіть правильний пароль:

```
DATABASE_URL="mysql://my-autotaile_vercel_app:wW4kW2rX4e@127.0.0.1:3307/database2024"
```

#### 2. Запустіть SSH тунель

**Варіант A: Через npm скрипт (Git Bash)**

```bash
npm run db:tunnel
```

**Варіант B: Вручну (Git Bash / WSL / Linux / macOS)**

```bash
ssh -N -L 3307:127.0.0.1:3306 root@212.162.152.33
```

**Варіант C: PowerShell (якщо встановлений SSH)**

```powershell
.\scripts\ssh-tunnel.ps1
```

⚠️ **Важливо:** Залиште термінал з SSH тунелем відкритим під час роботи з базою даних!

#### 3. У новому терміналі - налаштуйте Prisma

```bash
# Підключитися до БД та отримати структуру таблиць
npm run db:pull

# Згенерувати Prisma Client
npm run db:generate

# Або обидві команди разом
npm run db:setup
```

#### 4. Запустіть dev сервер

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prisma Commands

```bash
# Підключитися до БД та отримати структуру
npm run db:pull

# Згенерувати Prisma Client
npm run db:generate

# Відкрити Prisma Studio (GUI для БД)
npm run db:studio

# Налаштувати все одразу
npm run db:setup
```

### Architecture

```
Prisma (local)
  ↓
localhost:3307
  ↓ (SSH tunnel)
212.162.152.33:3306 (MySQL)
```

Prisma не знає про SSH тунель — для нього це локальна БД на `127.0.0.1:3307`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
