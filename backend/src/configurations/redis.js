// redisClient.js
import 'dotenv/config';
import redis from 'redis';

const REDIS_HOST = process.env.DB_HOST || '127.0.0.1';
const REDIS_PORT = process.env.DB_PORT || 6379;

const client = redis.createClient({
    host: REDIS_HOST, // Redis server address 
    port: REDIS_PORT, // Redis default port
});

client.on('connect', () => {
    // console.log('Redis connected');
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

// Ensure the client is connected before using
(async () => {
    await client.connect();
})();

export default client;
