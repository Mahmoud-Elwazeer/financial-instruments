module.exports = {
    apps: [
        {
        name: "backend",
        script: "./src/server.js",
        exec_mode: "cluster", // Enable cluster mode
        env: {
            NODE_ENV: "production",
            PORT: 3000,
            DB_HOST: "mongo",
            DB_PORT: 27017,
            DB_DATABASE: "financial_instrument",
            REDIS_HOST: "redis",
            REDIS_PORT: 6379,
            ExpiryTimeForCache: 3600,
            },
        },
    ],
};
