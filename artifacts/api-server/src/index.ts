import "dotenv/config";
import app from "./app";
import { logger } from "./lib/logger";
import { ensureDefaultAdminUser } from "./lib/admin-user";

const rawPort = process.env["PORT"] ?? "8080";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function ensureAdminUser() {
  const maxAttempts = 30;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await ensureDefaultAdminUser();
      logger.info("Default admin user ensured on startup");
      return;
    } catch (err) {
      if (attempt === maxAttempts) {
        throw err;
      }

      logger.warn(
        { err, attempt, maxAttempts },
        "Waiting for database before creating admin user",
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

await ensureAdminUser();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
