# 🚀 Швидкий деплой на Vercel

## ⚡ 5 кроків до успішного деплою

### 1. Налаштуйте pnpm
```bash
pnpm install --shamefully-hoist
```

### 2. Перевірте збірку локально
```bash
pnpm build
```

### 3. Налаштуйте Vercel Environment Variables
```
DATABASE_URL=mysql://my-autotaile_vercel_app:wW4kW2rX4e@212.162.152.33:3306/database2024
```

### 4. Деплойте
```bash
pnpm run deploy:vercel
```

### 5. Перевірте роботу
- Відкрийте `https://your-app.vercel.app`
- Протестуйте API: `https://your-app.vercel.app/api/test/uniqtrade-parts?article=OC90`

## ✅ Що налаштовано

- ✅ pnpm shamefully-hoist режим
- ✅ Vercel.json з includeFiles для Prisma
- ✅ Фейкова DATABASE_URL для збірки
- ✅ Підтримка зображень з S3
- ✅ Serverless Functions з Prisma Client

## 🔧 Якщо щось пішло не так

### Помилка "Prisma Client not found"
- Перевірте чи є `"includeFiles": ["node_modules/@prisma/client/**/*"]` у vercel.json

### Помилка "Cannot resolve module"
- Переконайтеся що `pnpm install --shamefully-hoist` виконано

### API повертає помилки
- Перевірте DATABASE_URL в Vercel Environment Variables
- Перевірте логи Vercel Functions

## 📞 Допомога

Дивіться детальні інструкції:
- [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) - повна діагностика
- [DEPLOY_STRATEGY.md](DEPLOY_STRATEGY.md) - стратегія та альтернативи