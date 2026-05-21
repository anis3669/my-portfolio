import { defineConfig } from "drizzle-kit";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL must be set");
}

const url = process.env.MYSQL_URL.split("?")[0];
const isLocal =
  url.includes("localhost") ||
  url.includes("127.0.0.1") ||
  url.includes("::1");

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "mysql",
  dbCredentials: {
    url,
    ...(isLocal ? {} : { ssl: {} }),
  },
});
