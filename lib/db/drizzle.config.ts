import { defineConfig } from "drizzle-kit";

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL must be set");
}

// Strip ?ssl=... params — drizzle-kit handles SSL separately
const url = process.env.MYSQL_URL.split("?")[0];

export default defineConfig({
  schema: "./src/schema/*.ts",
  dialect: "mysql",
  dbCredentials: {
    url,
    ssl: {},
  },
});
