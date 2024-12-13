import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import Exchange from '../models/exchange.js';
import Favorite from '../models/favorite.js'


let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: 'test' });

});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Insert sample data
    await Exchange.create([
        { symbol: 'AAPL', type: 'stock', name: 'Apple Inc.', country: 'USA', currency: 'USD', source: 'EOD' },
        { symbol: 'GOOGL', type: 'stock', name: 'Alphabet Inc.', country: 'USA', currency: 'USD', source: 'EOD' },
    ]);
});

afterEach(async () => {
    await Exchange.deleteMany();
    await Favorite.deleteMany();
});

describe('POST /api/v1/favorites', () => {
    it('should add an exchange to favorites', async () => {
        const symbol = 'AAPL';

        const response = await request(app)
            .post('/api/v1/favorites')
            .send({ symbol });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Favorite added successfully');
        expect(response.body.favorite.symbol).toBe(symbol);

        const favorite = await Favorite.findOne({ symbol });
        expect(favorite).not.toBeNull();
    });

    it('should return an error if not found symbol in body', async () => {
        const response = await request(app)
            .post('/api/v1/favorites');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('symbol not found');
    });

    it('should return an error if the exchange does not exist', async () => {
        const response = await request(app)
            .post('/api/v1/favorites')
            .send({ symbol: 'INVALID' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found Exchange');
    });

    it('should return an error if the exchange is already a favorite', async () => {
        const symbol = 'AAPL';
        await Favorite.create({ symbol });

        const response = await request(app)
            .post('/api/v1/favorites')
            .send({ symbol });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This exchange added before');
    });
});

describe('GET /api/v1/favorites', () => {
    it('should retrieve all favorite exchanges', async () => {
        await Favorite.create([
            { symbol: 'AAPL' },
            { symbol: 'GOOGL' },
        ]);

        const response = await request(app).get('/api/v1/favorites');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Favorites Retrieved successfully');
        expect(response.body.favorites.data).toHaveLength(2);
    });

    it('should return an error if no favorites are found', async () => {
        const response = await request(app).get('/api/v1/favorites');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Not Found Favorites');
    });
});

describe('DELETE /api/v1/favorites/:symbol', () => {
    it('should remove a favorite exchange', async () => {
        const symbol = 'AAPL';
        await Favorite.create({ symbol });

        const response = await request(app).delete(`/api/v1/favorites/${symbol}`);

        expect(response.status).toBe(204);

        const favorite = await Favorite.findOne({ symbol });
        expect(favorite).toBeNull();
    });

    it('should return an error if the favorite is not found', async () => {
        const response = await request(app).delete('/api/v1/favorites/INVALID');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found in Favorites');
    });
});

