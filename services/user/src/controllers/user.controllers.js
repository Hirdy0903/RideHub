const userService = require("../services/user.services");

const createProfile = async (req, res) => {
    try {
        const { userId, name, phone, gender } = req.body;

        const profile = await userService.createProfile({
            userId,
            name,
            phone,
            gender,
        });

        return res.status(201).json(profile);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    createProfile,
};