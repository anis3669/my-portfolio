# Portfolio

React + Vite portfolio with an Express API and admin panel.

## Setup

```env
MYSQL_URL=mysql://root:@localhost:3306/portfolio
SESSION_SECRET=any-random-secret-string
CORS_ORIGIN=http://localhost:5173
VITE_API_URL=auto
```

```bash
pnpm install
pnpm --filter @workspace/db run push
pnpm run dev
```

## Access

- Frontend: http://localhost:5173
- API: http://localhost:8080
- Admin: http://localhost:5173/admin

## Admin Login

- Username: `admin`
- Password: `admin123`

