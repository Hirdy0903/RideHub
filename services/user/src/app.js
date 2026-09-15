const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.get("/health", (req, res) => {
    res.json({
        service: "User Service",
        status: "OK",
    });
});

module.exports = app;