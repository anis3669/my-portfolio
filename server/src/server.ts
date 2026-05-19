import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio_admin",
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://192.168.1.93:5173"],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: "portfolio-secret-key-2024",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "lax",
  },
}));

// Extend Express Session to include userId
declare global {
  namespace Express {
    interface Session {
      userId?: number;
      username?: string;
    }
  }
}

// Initialize database
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);

    // Use the database
    await connection.execute(`USE ${dbConfig.database}`);

    // Create admin_users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Check if admin user exists
    const [rows] = await connection.execute("SELECT * FROM admin_users WHERE username = ?", ["admin"]);
    if ((rows as any[]).length === 0) {
      // Insert default admin user (password is plaintext for demo, in production use bcrypt)
      await connection.execute(
        "INSERT INTO admin_users (username, password) VALUES (?, ?)",
        ["admin", "admin123"]
      );
      console.log("✓ Default admin user created (username: admin, password: admin123)");
    }

    connection.release();
    console.log("✓ Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
}

// Routes

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Login
app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM admin_users WHERE username = ? AND password = ?",
      [username, password]
    );
    connection.release();

    const user = (rows as any[])[0];
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Set session
    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout
app.post("/api/auth/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Logout failed" });
      return;
    }
    res.json({ success: true, message: "Logout successful" });
  });
});

// Check authentication
app.get("/api/auth/me", (req: Request, res: Response) => {
  if (req.session.userId) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
      },
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Start server
async function start() {
  try {
    await initializeDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`\n  ✓ API Server running on http://localhost:${PORT}`);
      console.log(`  ✓ Database: ${dbConfig.database}@${dbConfig.host}:${dbConfig.port}`);
      console.log(`  ✓ Admin login: admin / admin123\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
