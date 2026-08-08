const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const signup = async ({ email, password, role }) => {
    const existingUser = await prisma.authUser.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.authUser.create({
        data: {
            email,
            passwordHash,
            role,
        },
    });

    return {
        message: "User registered successfully",
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };
};

const login = async ({ email, password }) => {
    const user = await prisma.authUser.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return {
        message: "Login successful",
        accessToken,
    };
};

module.exports = {
    signup,
    login,
};