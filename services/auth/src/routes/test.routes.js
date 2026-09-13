const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

router.get("/protected", authenticate, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user,
    });
});

module.exports = router;