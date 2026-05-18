# COT Dashboard · by sheewchukk

Дашборд Commitments of Traders (CFTC) з підключенням до офіційного API.

## Структура проекту

```
cot-dashboard/
├── api/
│   └── cot.js          ← Vercel serverless function (проксі до CFTC API)
├── public/
│   └── index.html      ← Головний сайт
├── vercel.json         ← Конфіг Vercel
└── package.json
```

## Деплой на Vercel (безкоштовно)

### Варіант 1 — через GitHub (рекомендовано)

1. Створи репозиторій на [github.com](https://github.com) і завантаж ці файли
2. Зайди на [vercel.com](https://vercel.com) → Sign Up (можна через GitHub)
3. New Project → Import Git Repository → обери свій репо
4. Framework Preset: **Other**
5. Натисни **Deploy** — все, сайт готовий!

### Варіант 2 — через Vercel CLI

```bash
npm i -g vercel
cd cot-dashboard
vercel
```

### Варіант 3 — перетягни папку

1. Зайди на [vercel.com/new](https://vercel.com/new)
2. Перетягни папку `cot-dashboard` у браузер

---

## Як це працює

- `public/index.html` — фронтенд, робить запити на `/api/cot`
- `api/cot.js` — Vercel Function, проксіює запити до `publicreporting.cftc.gov`
- Без проксі браузер отримує CORS помилку від CFTC

## Контракти

EUR, GBP, JPY, CHF, CAD, AUD, NZD, DXY, Gold, Silver, Copper,
WTI Oil, Nat Gas, S&P500, Nasdaq, Dow, 10Y/2Y T-Note, Bitcoin, Ether,
Corn, Wheat, Soybeans, Sugar, Coffee
