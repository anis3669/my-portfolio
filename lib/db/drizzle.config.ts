import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL must be set");
}

// Strip ?ssl=... params — drizzle-kit handles SSL separately
const url = process.env.MYSQL_URL.split("?")[0];

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "mysql",
  dbCredentials: {
    url,
    ssl: {},
  },
});
