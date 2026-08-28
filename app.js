const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const eventRouter = require("./routes/events");
const userRouter = require("./routes/users");

const app = express();
const buildDirectory = path.join(__dirname, "build");

app.disable("x-powered-by");
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false }));
if (process.env.CORS_ORIGIN) {
  const origins = process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
  app.use(cors({ origin: origins }));
}
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ service: "hoopn", status: "ok" });
});
app.use("/api/auth", rateLimit({ windowMs: 15 * 60_000, limit: 100, standardHeaders: "draft-8", legacyHeaders: false }), authRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/discovery", apiRouter);
// Preserve the original client path while links and bookmarks migrate.
app.use("/api/api", apiRouter);
app.use("/api", (_req, res) => res.status(404).json({ error: "API route not found" }));

app.use(express.static(buildDirectory));
app.use((req, res, next) => {
  if (req.method !== "GET" || !req.accepts("html")) return next();
  res.sendFile(path.join(buildDirectory, "index.html"), (error) => {
    if (error) next(error);
  });
});

app.use((error, _req, res, _next) => {
  if (process.env.NODE_ENV !== "test") console.error(error);
  res.status(error.status || 500).json({ error: error.expose ? error.message : "Unexpected server error" });
});

module.exports = app;
