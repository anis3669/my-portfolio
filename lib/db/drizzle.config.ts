import { defineConfig } from "drizzle-kit";

const connectionUrl = process.env.DATABASE_URL ?? process.env.MYSQL_URL;

if (!connectionUrl) {
  throw new Error("DATABASE_URL or MYSQL_URL must be set");
}

const url = new URL(connectionUrl.split("?")[0]);
const host = url.hostname;
const port = url.port ? Number(url.port) : 3306;
const user = decodeURIComponent(url.username);
const password = decodeURIComponent(url.password);
const database = url.pathname.replace(/^\//, "");

const isLocal =
  host.includes("localhost") ||
  host.includes("127.0.0.1") ||
  host.includes("::1");

export default defineConfig({
  schema: "./src/schema",
  dialect: "mysql",
  dbCredentials: {
    host,
    port,
    user,
    database,
    ...(password ? { password } : {}),
    ...(isLocal ? {} : { ssl: {} }),
  },
});
