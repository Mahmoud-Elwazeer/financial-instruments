import fs from 'fs';
import path from 'path';

// Models
import Exchange from '../models/exchange.js';
import Candle from '../models/candle.js';
import Metadata from '../models/metadata.js';

import dbConnection from '../configurations/database.js'


// Read JSON Files
const loadJSON = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Seed Data
const seedData = async () => {
  try {
    // Connect to DB
    dbConnection();

    // Clear existing data
    console.log('Clearing existing data...');
    await Exchange.deleteMany({});
    await Candle.deleteMany({});
    await Metadata.deleteMany({});

    // Load JSON data
    console.log('Loading JSON files...');
    const exchangeData = loadJSON('exchange.json');
    const candleData = loadJSON('candle.json');
    const metadataData = loadJSON('metadata.json');

    // Insert Exchange Data
    console.log('Inserting exchange data...');
    const exchanges = exchangeData.hits.hits.map(hit => hit._source); // Directly extract _source
    await Exchange.insertMany(exchanges);
    console.log(`${exchanges.length} exchanges inserted.`);

    // Insert Candle Data
    console.log('Inserting candle data...');
    const candles = candleData.hits.hits.map(hit => hit._source); // Directly extract _source
    await Candle.insertMany(candles);
    console.log(`${candles.length} candles inserted.`);

    // Insert Metadata Data
    console.log('Inserting metadata data...');
    const metadata = metadataData.hits.hits.map(hit => hit._source); // Directly extract _source
    await Metadata.insertMany(metadata);
    console.log(`${metadata.length} metadata records inserted.`);

    console.log('Data successfully seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run Seeder
seedData();
