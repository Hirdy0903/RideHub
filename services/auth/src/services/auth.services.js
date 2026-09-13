const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const crypto = require("crypto");

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

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
        },
    });

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
    };
};
const refresh = async (refreshToken) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: {
            token: refreshToken,
        },
    });

    if (!storedToken) {
        throw new Error("Invalid refresh token");
    }

    if (storedToken.expiresAt < new Date()) {
        throw new Error("Refresh token expired");
    }

    const user = await prisma.authUser.findUnique({
        where: {
            id: storedToken.userId,
        },
    });

    if (!user) {
        throw new Error("User not found");
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
        accessToken,
    };
};

module.exports = {
    signup,
    login,
    refresh,
};