# Діагностика проблем з підключенням до БД на Vercel

## Якщо бачите помилку "Помилка завантаження деталі"

### Крок 1: Перевірте Environment Variables в Vercel

1. Відкрийте Vercel Dashboard → Ваш проект → Settings → Environment Variables
2. Переконайтеся, що є змінна `DATABASE_URL`
3. Значення має бути:
   ```
   mysql://my-autotaile_vercel_app:wW4kW2rX4e@212.162.152.33:3306/database2024
   ```
   або з доменом:
   ```
   mysql://my-autotaile_vercel_app:wW4kW2rX4e@auto-db.pro:3306/database2024
   ```

### Крок 2: Перевірте, чи IP-адреси Vercel дозволені в MySQL

MySQL дозволяє підключення лише з певних IP. Переконайтеся, що:

- IP-адреси Vercel додані до whitelist в налаштуваннях MySQL
- Firewall дозволяє підключення з IP Vercel

### Крок 3: Перевірте логи Vercel

1. Відкрийте Vercel Dashboard → Ваш проект → Deployments
2. Виберіть останній deployment → Functions → Logs
3. Шукайте помилки з Prisma або MySQL

### Крок 4: Типові помилки та рішення

#### "Authentication failed"

- ❌ Неправильні credentials в DATABASE_URL
- ✅ Перевірте username та password

#### "ECONNREFUSED" або "ETIMEDOUT"

- ❌ IP-адреси Vercel не дозволені
- ✅ Додайте IP Vercel до whitelist MySQL

#### "DATABASE_URL is not set"

- ❌ Environment Variable не налаштований
- ✅ Додайте DATABASE_URL в Vercel Settings

### Крок 5: Тестування підключення

Після налаштування Environment Variables:

1. Зробіть новий deployment (або redeploy)
2. Перевірте сторінку: `https://your-app.vercel.app`
3. Перевірте API: `https://your-app.vercel.app/api/parts/1`

### Додаткова діагностика

Якщо проблема залишається, перевірте:

- Чи Prisma Client згенерований (є `postinstall` скрипт в package.json)
- Чи правильний формат DATABASE_URL (без лапок в Vercel)
- Чи база даних доступна з інтернету
