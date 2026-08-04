const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        service: "API Gateway",
        status: "OK",
    });
});

module.exports = router;