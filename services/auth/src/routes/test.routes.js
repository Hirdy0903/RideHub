const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.get(
    "/protected",
    authenticate,
    (req, res) => {
        res.json({
            message: "You accessed a protected route",
            user: req.user,
        });
    }
);

router.get(
    "/driver-only",
    authenticate,
    authorize("DRIVER"),
    (req, res) => {
        res.json({
            message: "Welcome Driver",
            user: req.user,
        });
    }
);

module.exports = router;