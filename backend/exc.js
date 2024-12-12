import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import Exchange from '../models/exchange.js';
import mockRedis from 'mock-redis'; // Mock Redis

let mongoServer;
let redisClient;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: 'test' });

    // Mock Redis client
    redisClient = mockRedis.createClient();
    app.__set__('redis', redisClient); // Inject the mock redis client into the app
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    // Using mockRedis cleanup methods if flushall and quit don't exist
    if (redisClient.flushall) {
        redisClient.flushall(); // Clear all data in mock Redis
    }
    if (redisClient.quit) {
        redisClient.quit(); // Properly quit the mock Redis client
    }
});

beforeEach(async () => {
    // Insert sample data into MongoDB before each test
    await Exchange.create([
        { symbol: 'AAPL', type: 'stock', name: 'Apple Inc.', country: 'USA', currency: 'USD', source: 'EOD' },
        { symbol: 'GOOGL', type: 'stock', name: 'Alphabet Inc.', country: 'USA', currency: 'USD', source: 'EOD' },
        { symbol: 'BMW', type: 'car', name: 'BMW AG', country: 'Germany', currency: 'EUR', source: 'EOD' },
    ]);
});

afterEach(async () => {
    await Exchange.deleteMany(); // Clean up MongoDB
    // Mock Redis clear data
    redisClient.flushall(); // Clear Redis cache after each test
});

describe('GET /api/v1/exchanges', () => {
    it('should retrieve all exchanges without filters', async () => {
        const res = await request(app).get('/api/v1/exchanges');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(3);
        expect(res.body.exchanges.data).toHaveLength(3);

        // Ensure data is cached in Redis after the first request
        redisClient.get('exchanges:{}', (err, reply) => {
            expect(reply).not.toBeNull(); // Cache should be set
        });
    });

    it('should filter exchanges by type', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ type: 'stock' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(2);
        expect(res.body.exchanges.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ symbol: 'AAPL', type: 'stock' }),
                expect.objectContaining({ symbol: 'GOOGL', type: 'stock' }),
            ])
        );

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"type":{"$in":["stock"]}}';
        redisClient.get(cacheKey, (err, reply) => {
            expect(reply).not.toBeNull(); // Cache should be set
        });
    });

    it('should filter exchanges by multiple types', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ type: 'stock,car' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(3);
        expect(res.body.exchanges.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ symbol: 'AAPL', type: 'stock' }),
                expect.objectContaining({ symbol: 'GOOGL', type: 'stock' }),
                expect.objectContaining({ symbol: 'BMW', type: 'car' }),
            ])
        );

        // Check if Redis cache for the query is set
        const cacheKey = 'exchanges:{"type":{"$in":["stock","car"]}}';
        redisClient.get(cacheKey, (err, reply) => {
            expect(reply).not.toBeNull(); // Cache should be set
        });
    });

    it('should filter exchanges by country', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ country: 'Germany' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(1);
        expect(res.body.exchanges.data[0]).toHaveProperty('symbol', 'BMW');

        // Check if Redis cache is set
        const cacheKey = 'exchanges:{"country":{"$in":["Germany"]}}';
        redisClient.get(cacheKey, (err, reply) => {
            expect(reply).not.toBeNull(); // Cache should be set
        });
    });

    it('should filter exchanges by currency', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ currency: 'EUR' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(1);
        expect(res.body.exchanges.data[0]).toHaveProperty('currency', 'EUR');

        // Check if Redis cache is set
        const cacheKey = 'exchanges:{"currency":{"$in":["EUR"]}}';
        redisClient.get(cacheKey, (err, reply) => {
            expect(reply).not.toBeNull(); // Cache should be set
        });
    });

    it('should return message error Not Found Exchange', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ type: 'crypto' });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found Exchanges');
    });

    it('should return message error for multiple filters with no data', async () => {
        const res = await request(app)
            .get('/api/v1/exchanges')
            .query({ type: 'stock', currency: 'EUR', country: 'USA' });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found Exchanges');
    });
});

describe('GET /api/v1/exchanges/filters', () => {
    it('should retrieve the filters for type, currency, and country', async () => {
        const res = await request(app).get('/api/v1/exchanges/filters');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Filters Retrieved successfully');

        const filters = res.body.filters;

        // Check types filter
        expect(filters.types).toEqual(expect.arrayContaining(['car', 'stock']));

        // Check currencies filter
        expect(filters.currencies).toEqual(expect.arrayContaining(['EUR', 'USD']));

        // Check countries filter
        expect(filters.countries).toEqual(expect.arrayContaining(['Germany', 'USA']));
    });
});
