import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL must be set");
}

const url = process.env.MYSQL_URL.split("?")[0];
const isLocal =
  url.includes("localhost") ||
  url.includes("127.0.0.1") ||
  url.includes("::1");

export default defineConfig({
  schema: "./src/schema/*.ts",
  dialect: "mysql",
  dbCredentials: {
    url,
    ...(isLocal ? {} : { ssl: {} }),
  },
});
