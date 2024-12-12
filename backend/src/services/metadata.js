import ApiError from "../utils/apiError.js";
import Metadata from '../models/metadata.js';
import client from "../configurations/redis.js";
import getDataFromRedis from "../utils/redis.js";
import 'dotenv/config';

const expireTime = process.env.ExpiryTimeForCache || 3600;

export const getOne = async(req) => {
    const { symbol } = req.params;

    const cacheKey = `metadata:${symbol}`;

    // First check if data exists in the cache
    const metadataData = await getDataFromRedis(cacheKey);
    
    if (metadataData) {
        console.log('Data fetched from cache');
        return metadataData;
    }

    const metadata = await Metadata.findOne({ symbol });
    if (!metadata)
        throw new ApiError('Not Found Metadata', 404);

    // Cache the result in Redis with an expiration time of 1 hour
    client.setEx(cacheKey, expireTime, JSON.stringify(metadata));
    console.log('Data fetched from MongoDB and cached');

    return metadata
}
