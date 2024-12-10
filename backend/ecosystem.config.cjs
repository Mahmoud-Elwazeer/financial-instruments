module.exports = {
    apps: [
      {
        name: 'api',
        script: './src/app.js',
        env: {
          NODE_ENV: 'dev',
        },
        env_production: {
          NODE_ENV: 'production',
          DB_DATABASE: 'financial_instrument',
          DB_PORT: 27017,
          DB_HOST: '127.0.0.1',
          PORT: 3000,
        }
      }
    ]
  };
  