import client from '../configurations/redis.js';
import ApiError from './apiError.js'

// Helper function to get cached data from Redis
const getDataFromRedis = async (cacheKey) => {
    try {
        if (!client.isOpen) {
            await client.connect(); // Reconnect if the client was closed
        }
        const data = await client.get(cacheKey);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        throw new ApiError('Redis error: ' + err.message, 500);
    }
};

export default getDataFromRedis;
