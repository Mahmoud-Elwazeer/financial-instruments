import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import Exchange from '../models/exchange.js';
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
    await Exchange.create([
        { symbol: 'AAPL', type: 'stock', name: 'Apple Inc.', country: 'USA', currency: 'USD', source: 'EOD' },
        { symbol: 'GOOGL', type: 'stock', name: 'Alphabet Inc.', country: 'USA', currency: 'USD', source: 'EOD' },
        { symbol: 'BMW', type: 'car', name: 'BMW AG', country: 'Germany', currency: 'EUR', source: 'EOD' },
    ]);
});

afterEach(async () => {
    await Exchange.deleteMany();
    redisClient.flushall();
});

describe('GET /api/v1/exchanges', () => {
    it('should retrieve all exchanges without filters', async () => {
        const res = await request(app).get('/api/v1/exchanges');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(3);
        expect(res.body.exchanges.data).toHaveLength(3);

        // First check if data exists in the cache
        const cacheKey = 'exchanges:{}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(3);
        expect(reply.data).toHaveLength(3);
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
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(2);
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

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"type":{"$in":["stock","car"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(3);
    });

    it('should filter exchanges by country', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ country: 'Germany' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(1);
        expect(res.body.exchanges.data[0]).toHaveProperty('symbol', 'BMW');

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"country":{"$in":["Germany"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(1);
    });

    it('should filter exchanges by multiple conuties', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ country: 'Germany,USA' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(3);
        expect(res.body.exchanges.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ symbol: 'AAPL', country: 'USA' }),
                expect.objectContaining({ symbol: 'GOOGL', country: 'USA' }),
                expect.objectContaining({ symbol: 'BMW', country: 'Germany' }),
            ])
        );

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"country":{"$in":["Germany","USA"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(3);
    });

    it('should filter exchanges by currency', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ currency: 'EUR' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(1);
        expect(res.body.exchanges.data[0]).toHaveProperty('currency', 'EUR');

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"currency":{"$in":["EUR"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(1);
    });

    it('should filter exchanges by multiple currencies', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ currency: 'EUR,USD' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(3);
        expect(res.body.exchanges.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ symbol: 'AAPL', currency: 'USD' }),
                expect.objectContaining({ symbol: 'GOOGL', currency: 'USD' }),
                expect.objectContaining({ symbol: 'BMW', currency: 'EUR' }),
            ])
        );

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"currency":{"$in":["EUR","USD"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(3);
    });

    it('should filter exchanges by multiple query parameters', async () => {
        const res = await request(app)
            .get('/api/v1/exchanges')
            .query({ type: 'stock', country: 'USA' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(2);

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"type":{"$in":["stock"]},"country":{"$in":["USA"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(2);
    });

    it('should filter exchanges by multiple query parameters', async () => {
        const res = await request(app)
            .get('/api/v1/exchanges')
            .query({ type: 'stock,car', country: 'USA' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchanges Retrieved successfully');
        expect(res.body.exchanges.totalItems).toBe(2);

        // Ensure that the Redis cache is set for this query
        const cacheKey = 'exchanges:{"type":{"$in":["stock","car"]},"country":{"$in":["USA"]}}';
        const reply = await getDataFromRedis(cacheKey);
        expect(reply).not.toBeNull();
        expect(reply.totalItems).toBe(2);
    });

    it('should return messgae error Not Found Exchange', async () => {
        const res = await request(app).get('/api/v1/exchanges').query({ type: 'crypto' });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found Exchanges');
    });

    it('should filter exchanges by multiple query parameters and error not found', async () => {
        const res = await request(app)
            .get('/api/v1/exchanges')
            .query({ type: 'stock', currency:'EUR', country: 'USA' });
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Not Found Exchanges');
    });
});


describe('GET /api/v1/exchanges/:symbol', () => {
    it('should retrieve an exchange by symbol', async () => {
        const res = await request(app).get('/api/v1/exchanges/AAPL');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Exchange Retrieved successfully');
        expect(res.body.exchange).toHaveProperty('symbol', 'AAPL');
        expect(res.body.exchange).toHaveProperty('name', 'Apple Inc.');
        expect(res.body.exchange).toHaveProperty('type', 'stock');
    });

    it('should return 404 if exchange not found', async () => {
        const res = await request(app).get('/api/v1/exchanges/XYZ');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found Exchange');
    });
});

describe('GET /api/v1/exchanges/filters', () => {
    it('should retrieve the filters for type, currency, and country', async () => {
        const res = await request(app).get('/api/v1/exchanges/filters');

        expect(res.status).toBe(200);   
        expect(res.body.message).toBe('Filters Retrieved successfully');

        const filters = res.body.filters;

        // Check types filter
        expect(filters.types).toEqual(expect.arrayContaining(['car', 'stock'])); // Ensure all types are present
        expect(filters.types).toEqual(['car', 'stock']); // Ensure types are sorted alphabetically

        // Check currencies filter
        expect(filters.currencies).toEqual(expect.arrayContaining(['EUR', 'USD'])); // Ensure all currencies are present
        expect(filters.currencies).toEqual(['EUR', 'USD']); // Ensure currencies are sorted alphabetically

        // Check countries filter
        expect(filters.countries).toEqual(expect.arrayContaining(['Germany', 'USA'])); // Ensure all countries are present
        expect(filters.countries).toEqual(['Germany', 'USA']); // Ensure countries are sorted alphabetically
    });
});