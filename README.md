# Anis Bastola — Portfolio

A professional React + Vite portfolio for Anis Bastola, Junior Full Stack Developer based in Madhyapur Thimi, Nepal.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend**: Node.js, Express 5, Drizzle ORM, MySQL
- **Admin Panel**: React admin panel at `/admin` (Filament-inspired dark UI)
- **Package Manager**: pnpm (monorepo)

---

## Running Locally with XAMPP

### Prerequisites

- [Node.js 20+](https://nodejs.org)
- [pnpm](https://pnpm.io) — install with `npm install -g pnpm`
- [XAMPP](https://www.apachefriends.org) — with MySQL running

---

### Step 1 — Start XAMPP MySQL

Open XAMPP Control Panel and **Start** the **MySQL** module.

---

### Step 2 — Create the database

Open **phpMyAdmin** (`http://localhost/phpmyadmin`) and create a new database:

```sql
CREATE DATABASE portfolio;
```

---

### Step 3 — Clone the repo

```bash
git clone https://github.com/anis3669/my-portfolio.git
cd my-portfolio
```

---

### Step 4 — Install all dependencies

> ⚠️ This step is required before anything else. Do not skip it.

```bash
pnpm install
```

---

### Step 5 — Create your `.env` file

Create a file called `.env` in the **project root** (same folder as `package.json`):

```env
MYSQL_URL=mysql://root:@localhost:3306/portfolio
SESSION_SECRET=any-random-secret-string
```

> **Note:** XAMPP MySQL default port is `3306`. If yours is `3307`, change it accordingly.
> Default username is `root` with no password. If you set a password, use `mysql://root:yourpassword@localhost:3306/portfolio`.

**PowerShell (Windows):**
```powershell
$env:MYSQL_URL='mysql://root:@localhost:3306/portfolio'
$env:SESSION_SECRET='any-random-secret-string'
```

---

### Step 6 — Push the database schema

This creates all the tables in your `portfolio` database:

```bash
pnpm --filter @workspace/db run push
```

**PowerShell (Windows) — set env var inline:**
```powershell
$env:MYSQL_URL='mysql://root:@localhost:3306/portfolio'; pnpm --filter @workspace/db run push
```

---

### Step 7 — Run both servers

Open **two terminals** side by side:

**Terminal 1 — API (backend):**
```bash
pnpm --filter @workspace/api-server run dev
```
Runs at `http://localhost:8080`

**Terminal 2 — Portfolio (frontend):**
```bash
pnpm --filter @workspace/portfolio run dev
```
Runs at `http://localhost:5173`

> ⚠️ You must set `MYSQL_URL` before starting the API server.
>
> **PowerShell:** `$env:MYSQL_URL='mysql://root:@localhost:3306/portfolio'; $env:SESSION_SECRET='secret'; pnpm --filter @workspace/api-server run dev`

---

### Step 8 — Seed the database (first time only)

Wait for the API server to start, then run:

```bash
curl -X POST http://localhost:8080/api/seed
```

Or use **Postman** → POST → `http://localhost:8080/api/seed`

---

### Done! Open in your browser

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Portfolio website |
| `http://localhost:5173/admin` | Admin panel |

**Admin login:** username `admin` / password `admin123`

---

## Folder Structure

```
my-portfolio/
├── artifacts/
│   ├── portfolio/          # React + Vite frontend
│   └── api-server/         # Express API backend
├── lib/
│   └── db/                 # Drizzle ORM schema + MySQL connection
├── pnpm-workspace.yaml     # Monorepo config
└── .env                    # Your local environment variables (not committed)
```

## Admin Panel Features

From `/admin` you can manage:

- **Projects** — add, edit, delete portfolio projects
- **Skills** — manage your skill list and proficiency levels
- **Experience** — update your work history
- **Profile** — update your name, bio, contact info, and links
