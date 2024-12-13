import mongoose from 'mongoose'

// schema
const exchange = new mongoose.Schema({
    symbol: {
        type: String,
        unique: true,
        required: true
    }, // Unique identifier
    ticker: String,                                         // Ticker symbol
    code: String,                                           // Financial instrument code
    isin: String,                                           // International Securities Identification Number
    type: {
        type: String,
        required: true 
    },  // Type of instrument (e.g., mutual fund, stock)
    wpkn: String,                                           // Wertpapierkennnummer (if applicable)
    name: { 
        type: String,
        required: true 
    },  // Short name
    nameLong: String,                                       // Long name
    region: String,                                         // Region (if specified)
    country: String,                                        // Country of origin
    currency: {
        type: String,
        required: true 
    },   // Trading currency
    figi: String,                                           // Financial Instrument Global Identifier
    cik: String,                                            // Central Index Key (if applicable)
    lei: String,                                            // Legal Entity Identifier (if applicable)
    source: {
        type: String,
        required: true 
    },   // Data source (e.g., EOD)
    operatingMIC: String,                                   // Market Identifier Code(s)
    codeExchange: String,                                   // Exchange code
    virtualExchange: String,                                // Virtual exchange
    nameExchange: String,                                   // Exchange name
    isArtificialExchange: Boolean,                         // Flag for artificial exchange
    segmentExchange: String,                                // Exchange segment
    segmentNameExchange: String,                            // Segment name of the exchange
    },
    { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Index for faster lookups
exchange.index({ symbol: 1 });
exchange.index({ type: 1 });
exchange.index({ currency: 1 });
exchange.index({ country: 1 });
exchange.index({ type: 1, currency: 1, country: 1 });


const Exchange = mongoose.model('Exchange', exchange, 'exchanges');

export default Exchange;
