// redisClient.js
import 'dotenv/config';
import redis from 'redis';

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

const client = redis.createClient({
    socket: {
        host: REDIS_HOST, // Redis server address
        port: REDIS_PORT, // Redis default port
    },
});

client.on('connect', () => {
    console.log('Redis connected');
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

// Ensure the client is connected before using
(async () => {
    try {
        console.log(`Attempting to connect to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
        await client.connect();
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

export default client;
