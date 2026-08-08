const authService = require("../services/auth.services");
const { signupSchema } = require("../validators/auth.validator");

const signup = async (req, res) => {
    try {
        const data = signupSchema.parse(req.body);

        const result = await authService.signup(data);

        return res.status(201).json(result);
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues,
            });
        }

        return res.status(400).json({
            message: error.message,
        });
    }
};
const login = async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);

        const result = await authService.login(data);

        return res.status(200).json(result);
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues,
            });
        }

        return res.status(401).json({
            message: error.message,
        });
    }
};
module.exports = {
    signup,
    login,
};