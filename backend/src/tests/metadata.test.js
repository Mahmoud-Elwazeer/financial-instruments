import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import Metadata from '../models/metadata.js';
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
    await Metadata.create([
        { symbol: '18MS.XETRA', source: 'EOD', ticker: '18MS', type: 'exchange traded fund', validUntil: '2024-02-13T01:30:15.640003Z', currency: 'EUR'},
        { symbol: '0GZC.XETRA', source: 'EOD', ticker: '0GZC', type: 'exchange traded commodity', validUntil: '2024-02-13T01:30:36.874041Z', currency: 'EUR'},
    ]);
});

afterEach(async () => {
    await Metadata.deleteMany();
    redisClient.flushall();
});


describe('GET /api/v1/metadata/:symbol', () => {
    it('should retrieve  metadata for specific symbol', async () => {
        const res = await request(app).get('/api/v1/metadata/18MS.XETRA');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Metadata Retrieved successfully');
        expect(res.body.metadata).toHaveProperty('symbol', '18MS.XETRA');
    });

    it('should return 404 for a missing symbol', async () => {
        const res = await request(app).get('/api/v1/metadata/INVALID');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found Metadata');
    });

    it('should cache the response in Redis for future requests', async () => {
        // Initial request to populate the cache
        await request(app).get('/api/v1/metadata/0GZC.XETRA');
        
        // Check Redis cache
        const cacheKey = 'metadata:0GZC.XETRA';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
    });
});