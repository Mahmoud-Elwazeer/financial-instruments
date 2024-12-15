module.exports = {
    apps: [
      {
        name: 'api',
        script: './src/server.js',
        env: {
          NODE_ENV: 'production',
          DB_DATABASE: 'financial_instrument',
          DB_PORT: 27017,
          DB_HOST: '127.0.0.1',
          PORT: 3000,
          REDIS_HOST:'127.0.0.1',
          REDIS_PORT:6379,
          ExpiryTimeForCache:3600,
        }
      }
    ]
};
