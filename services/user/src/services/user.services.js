const prisma = require("../config/prisma");

const createProfile = async ({ userId, name, phone, gender }) => {
    const profile = await prisma.userProfile.create({
        data: {
            userId,
            name,
            phone,
            gender,
        },
    });

    return profile;
};

module.exports = {
    createProfile,
};