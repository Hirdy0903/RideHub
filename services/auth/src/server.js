const app = require("./app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await prisma.$connect();
        console.log("Auth DB connected");

        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to Auth DB:", error);
        process.exit(1);
    }
}

startServer();