const express = require("express");
const router = express.Router();

const { createProfile } = require("../controllers/user.controllers");
const authenticate = require("../middleware/auth.middleware");

router.post("/profile", authenticate, createProfile);

module.exports = router;