import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import cookieParser from "cookie-parser";
import router from "./routes";
import { logger } from "./lib/logger";
import { pool } from "@workspace/db";

const MySQLStore = MySQLStoreFactory(session);
const isProduction = process.env.NODE_ENV === "production";
const configuredOrigins = [process.env.CORS_ORIGIN, process.env.FRONTEND_URL]
  .flatMap((value) => (value ? value.split(",") : []))
  .map((value) => value.trim())
  .filter(Boolean);
const allowedOrigins = new Set(configuredOrigins);

const sessionCookieSecure =
  process.env.SESSION_COOKIE_SECURE === "true" || isProduction;
const sessionSameSite =
  process.env.SESSION_COOKIE_SAMESITE === "none" || sessionCookieSecure
    ? "none"
    : "lax";

const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true,
    expiration: 1000 * 60 * 60 * 24 * 7,
    checkExpirationInterval: 1000 * 60 * 15,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  pool as never,
);

const app: Express = express();

app.set("trust proxy", isProduction);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (!isProduction && allowedOrigins.size === 0) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.size === 0 || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET ?? "portfolio-admin-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: sessionCookieSecure,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: sessionSameSite,
  },
}));

app.use("/api", router);

export default app;
