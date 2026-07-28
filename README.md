# My Portfolio // Full-Stack Portfolio Management System

A modern, full-stack portfolio management system built with **React**, **Express.js**, **TypeScript**, and **MySQL**. The project includes a responsive portfolio website and a secure admin dashboard that allows managing portfolio content without modifying source code.

## Overview

This application serves as both a personal portfolio website and a content management system (CMS). Visitors can browse projects, skills, work experience, and contact information, while administrators can securely manage all portfolio data through an intuitive dashboard.

---

##  Features

### Public Portfolio

- Responsive landing page
- Hero section
- About section
- Skills showcase
- Project gallery
- Experience timeline
- Contact form
- Social media links

### Admin Dashboard

- Secure admin authentication
- Manage profile information
- Projects CRUD
- Skills CRUD
- Experience CRUD
- Contact message management
- REST API integration

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MySQL

### Other Tools

- pnpm Workspace
- REST API
- Pino Logger

---

##  Project Structure

```
my-portfolio/
│
├── artifacts/
│   ├── api-server/          # Express Backend
│   └── portfolio/           # React Frontend
│
├── server/
├── storage/
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- MySQL

---

### Clone Repository

```bash
git clone https://github.com/anis3669/my-portfolio.git

cd my-portfolio
```

---

### Install Dependencies

```bash
pnpm install
```

---

### Configure Environment

Create the required `.env` file for the backend.

Example:

```env
PORT=8080
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=portfolio
```

---

### Run Development Server

From the project root:

```bash
pnpm dev
```

This starts:

- React Frontend
- Express Backend

simultaneously.

---

## Admin Login

Default credentials:

```
Username: admin
Password: admin123
```

---

## API Modules

- Profile
- Projects
- Skills
- Experiences
- Contact
- Authentication
- Health Check
- Database Seeder

---

## Portfolio Sections

- Home
- About
- Skills
- Projects
- Experience
- Contact

---

## Future Improvements

- Image upload using Cloudinary
- Blog module
- Dark/Light mode
- Multi-language support
- Analytics dashboard
- Visitor statistics
- Email notifications
- Resume management
- Project categories
- Testimonials

---

## Development Highlights

- Modular architecture
- RESTful API
- TypeScript support
- Responsive UI
- Secure authentication
- Scalable project structure
- Easy content management

---

##  Author

**Anis Bastola**

GitHub:
https://github.com/anis3669

---

##  License

This project is licensed under the MIT License.

---

If you found this project helpful, consider giving it a star on GitHub.