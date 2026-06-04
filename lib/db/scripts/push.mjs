import "dotenv/config";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const connectionUrl = process.env.DATABASE_URL ?? process.env.MYSQL_URL;

if (!connectionUrl) {
  throw new Error("DATABASE_URL or MYSQL_URL must be set.");
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const drizzleDir = path.resolve(scriptDir, "..", "drizzle");
const force = process.argv.includes("--force");

const migrationFiles = (await readdir(drizzleDir))
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (migrationFiles.length === 0) {
  throw new Error(`No SQL migrations found in ${drizzleDir}`);
}

const migrationFile = migrationFiles[migrationFiles.length - 1];
const migrationPath = path.join(drizzleDir, migrationFile);
const rawSql = await readFile(migrationPath, "utf8");
const sql = rawSql
  .replace(/;\s*--> statement-breakpoint/g, ";")
  .replace(/^--> statement-breakpoint\s*$/gm, "")
  .trim();

const pool = mysql.createPool({
  uri: connectionUrl,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 1,
});

const connection = await pool.getConnection();

try {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS __drizzle_migrations (
      id int NOT NULL AUTO_INCREMENT,
      migration_name varchar(255) NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY __drizzle_migrations_migration_name_unique (migration_name)
    )
  `);

  if (!force) {
    const [rows] = await connection.query(
      "SELECT migration_name FROM __drizzle_migrations WHERE migration_name = ? LIMIT 1",
      [migrationFile],
    );

    if (rows.length > 0) {
      console.log(`Migration already applied: ${migrationFile}`);
      process.exit(0);
    }
  }

  await connection.query(sql);
  await connection.query(
    "INSERT INTO __drizzle_migrations (migration_name) VALUES (?)",
    [migrationFile],
  );

  console.log(`Applied migration: ${migrationFile}`);
} finally {
  connection.release();
  await pool.end();
}