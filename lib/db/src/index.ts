import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL must be set.");
}

// Strip SSL query param — we pass ssl option separately
const uri = process.env.MYSQL_URL.split("?")[0];

export const pool = mysql.createPool({
  uri,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(pool, { schema, mode: "default" });

export * from "./schema";
