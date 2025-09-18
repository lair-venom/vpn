# Деплой на Netlify

## Автоматический деплой

1. Подключите репозиторий к Netlify
2. Настройки сборки уже настроены в `netlify.toml`
3. Команда сборки: `npm run build`
4. Папка публикации: `dist`

## Ручной деплой

1. Соберите проект:
   ```bash
   npm run build
   ```

2. Установите Netlify CLI (если не установлен):
   ```bash
   npm install -g netlify-cli
   ```

3. Войдите в аккаунт:
   ```bash
   netlify login
   ```

4. Деплой:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Настройки

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18
- **Redirects**: Настроены для SPA
- **Headers**: Настроены для безопасности и кеширования

## Переменные окружения

Если нужны переменные окружения, добавьте их в настройках сайта на Netlify:
- Site settings → Environment variables

## Домен

После деплоя вы можете:
- Использовать бесплатный поддомен `.netlify.app`
- Подключить собственный домен в настройках