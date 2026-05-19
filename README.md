# Anis Bastola — Portfolio

  A professional React + Vite portfolio for Anis Bastola, Junior Full Stack Developer based in Madhyapur Thimi, Nepal.

  ## Tech Stack
  - **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion
  - **Backend**: Node.js, Express 5, Drizzle ORM, PostgreSQL
  - **Admin Panel**: Custom Filament-inspired admin panel at `/admin`

  ## Features
  - Animated hero with role cycling and profile card
  - Projects, Skills, Experience, Contact sections
  - Full admin panel with CRUD for all content
  - PostgreSQL-backed dynamic data

  ## Admin Access
  - URL: `/admin`
  - Username: `admin`
  - Password: `admin123`

  ## Development
  ```bash
  pnpm install
  pnpm --filter @workspace/portfolio run dev   # Frontend on :21113
  pnpm --filter @workspace/api-server run dev  # API on :8080
  ```
  