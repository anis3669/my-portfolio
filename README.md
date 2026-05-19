# Anis Bastola — Portfolio

  A professional React + Vite portfolio for Anis Bastola, Junior Full Stack Developer based in Madhyapur Thimi, Nepal.

  ## Tech Stack
  - **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion
  - **Backend**: Node.js, Express 5, Drizzle ORM, **MySQL (Aiven cloud)**
  - **Admin Panel**: React admin panel at `/admin` (Filament-inspired dark UI)

  ## Features
  - Animated hero with role cycling and profile card
  - Projects, Skills, Experience, Contact sections
  - Full CRUD admin panel for all content
  - PostgreSQL → MySQL migration (Aiven cloud hosted)

  ## Admin Access
  - URL: `/admin`
  - Username: `admin`
  - Password: `admin123`

  ## Environment Variables
  ```
  MYSQL_URL=mysql://user:pass@host:port/db
  SESSION_SECRET=your-secret
  ```

  ## Development
  ```bash
  pnpm install
  pnpm --filter @workspace/portfolio run dev   # Frontend :21113
  pnpm --filter @workspace/api-server run dev  # API :8080
  ```
  