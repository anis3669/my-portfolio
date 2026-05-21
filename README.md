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

### Step 3 — Clone and install

```bash
git clone https://github.com/anis3669/my-portfolio.git
cd my-portfolio
pnpm install
```

---

### Step 4 — Create your `.env` file

Create a `.env` file in the **project root**:

```env
MYSQL_URL=mysql://root:@localhost:3306/portfolio
SESSION_SECRET=any-random-secret-string
```

> **Note:** XAMPP's default MySQL user is `root` with **no password**. If you set a password in phpMyAdmin, use `mysql://root:yourpassword@localhost:3306/portfolio`.

---

### Step 5 — Push the database schema

This creates all the tables automatically:

```bash
pnpm --filter @workspace/db run push
```

---

### Step 6 — Run both servers

Open **two terminals**:

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

---

### Step 7 — Seed the database

Run this once to populate projects, skills, experience, and create the admin user:

```bash
curl -X POST http://localhost:8080/api/seed
```

Or open in your browser: `http://localhost:8080/api/seed` (won't work — use curl or Postman with POST).

---

### Done! Open in your browser

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Portfolio website |
| `http://localhost:5173/admin` | Admin panel |

**Admin login:** username `admin` / password `admin123`

---

## Admin Panel Features

From `/admin` you can manage:

- **Projects** — add, edit, delete portfolio projects
- **Skills** — manage your skill list and proficiency levels
- **Experience** — update your work history
- **Profile** — update your name, bio, contact info, and links

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
