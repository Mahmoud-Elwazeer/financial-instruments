import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import Candle from '../models/candle.js';
import redis from 'redis-mock';  // Import mock-redis-server
import getDataFromRedis from '../utils/redis.js';

let mongoServer;
let redisClient;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: 'test' });

    // Create a mock Redis server
    redisClient = redis.createClient();  // Create the mock Redis client
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    redisClient.quit();
});

beforeEach(async () => {
    // Insert sample data
    await Candle.create([
        { symbol: 'AAPL', dateTime: '2023-06-20T21:59:59Z', startPrice: 932, highestPrice: 932, lowestPrice: 927, endPrice: 931.6, currency: 'USD'},
        { symbol: 'AAPL', dateTime: '2024-06-20T21:59:59Z', startPrice: 932, highestPrice: 932, lowestPrice: 927, endPrice: 931.6, currency: 'USD'},
        { symbol: 'ALEZX.US', dateTime: '2022-06-20T21:59:59Z', startPrice: 7.2, highestPrice: 7.2, lowestPrice: 7.2, endPrice: 7.2, currency: 'USD'},
        { symbol: 'ALEZX.US', dateTime: '2024-06-20T21:59:59Z', startPrice: 8, highestPrice: 8, lowestPrice: 8, endPrice: 8, currency: 'USD'},
    ]);
});

afterEach(async () => {
    await Candle.deleteMany();
    redisClient.flushall();
});

describe('GET /api/v1/candles/:symbol', () => {
    it('should retrieve all candles for specific symbol', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Candles Retrieved successfully');
        expect(res.body.candles.totalItems).toBe(2);
        expect(res.body.candles.data).toHaveLength(2);

        // First check if data exists in the cache
        const cacheKey = 'candles:{"symbol":"AAPL"}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(2);
        expect(reply.data).toHaveLength(2);
    });

    it('should validate invalid "from" query parameter', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?from=invalid-date');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('"from" parameter is not a valid date.');
    });

    it('should validate invalid "to" query parameter', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?to=invalid-date');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('"to" parameter is not a valid date.');
    });

    it('should validate that "to" is not earlier than "from"', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?from=2024-06-20&to=2023-06-20');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('"to" parameter must be greater than or equal to the "from" parameter.');
    });

    it('should retrieve candles within a specific date range', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?from=2024-01-01&to=2024-12-31');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Candles Retrieved successfully');
        expect(res.body.candles.totalItems).toBe(1);
        expect(res.body.candles.data[0].dateTime).toBe('2024-06-20T21:59:59.000Z');
    });

    it('should retrieve candles with only a "from" date', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?from=2024-01-01');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Candles Retrieved successfully');
        expect(res.body.candles.totalItems).toBe(1);
    });

    it('should retrieve candles with only a "to" date', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?to=2023-12-31');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Candles Retrieved successfully');
        expect(res.body.candles.totalItems).toBe(1);
    });

    it('should return 404 if no candles match the query', async () => {
        const res = await request(app).get('/api/v1/candles/AAPL?from=2025-01-01&to=2025-12-31');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No data found for the selected time range. Please adjust the date range and try again');
    });

    it('should return 404 for a missing symbol', async () => {
        const res = await request(app).get('/api/v1/candles/INVALID');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found Candles');
    });

    it('should cache the response in Redis for future requests', async () => {
        // Initial request to populate the cache
        await request(app).get('/api/v1/candles/AAPL');
        
        // Check Redis cache
        const cacheKey = 'candles:{"symbol":"AAPL"}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(2);
        expect(reply.data).toHaveLength(2);
    });
});