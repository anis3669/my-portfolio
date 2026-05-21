import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL must be set.");
}

const rawUrl = process.env.MYSQL_URL.split("?")[0];

// Only use SSL for remote/cloud hosts — local XAMPP doesn't need it
const isLocal =
  rawUrl.includes("localhost") ||
  rawUrl.includes("127.0.0.1") ||
  rawUrl.includes("::1");

export const pool = mysql.createPool({
  uri: rawUrl,
  ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
});

export const db = drizzle(pool, { schema, mode: "default" });

export * from "./schema";
