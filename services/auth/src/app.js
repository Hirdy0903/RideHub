const express = require("express");
const authRoutes = require("./routes/auth.routes");
const healthRoutes = require("./routes/health.routes");
const { he } = require("zod/v4/locales");

const app = express();

app.use(express.json());
app.use("/", healthRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;