const express = require("express");

const router = express.Router();
const {
    signup,
    login,
    refresh,
} = require("../controllers/auth.controllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;