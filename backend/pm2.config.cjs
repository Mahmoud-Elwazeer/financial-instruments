module.exports = {
    apps: [
        {
            name: "backend",
            script: "./src/server.js",
            exec_mode: "cluster", // Enable cluster mode
            env: {
                NODE_ENV: process.env.NODE_ENV || "production",
                PORT: process.env.PORT || 3000,
                DB_HOST: process.env.DB_HOST || "127.0.0.1",
                DB_PORT: process.env.DB_PORT || 27017,
                DB_DATABASE: process.env.DB_DATABASE || "financial_instrument",
                REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
                REDIS_PORT: process.env.REDIS_PORT || 6379,
                ExpiryTimeForCache: process.env.ExpiryTimeForCache || 3600,
            },
        },
    ],
};
