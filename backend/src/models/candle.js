import mongoose from 'mongoose'

const  candle = new mongoose.Schema({
    symbol: { 
        type: String,
        ref: 'Exchange',
        required: true
    },    // Symbol of the financial instrument
    dateTime: { 
        type: Date,
        required: true
    },    // Timestamp of the candle
    startPrice: { 
        type: Number,
        required: true 
    },   // Opening price
    highestPrice: { 
        type: Number,
        required: true 
    },   // Highest price during the interval
    lowestPrice: { 
        type: Number,
        required: true 
    },    // Lowest price during the interval
    endPrice: { 
        type: Number,
        required: true 
    },     // Closing price
    volume: { 
        type: Number,
        default: 0 
    },     // Trading volume
    source: { 
        type: String,
        default: '' 
    },   // Data source (e.g., EOD)
    candleType: { 
        type: String, 
        default: 'endofday' 
    },    // Type of candle (default to end-of-day)
    currency: { 
        type: String,
        required: true 
    },           // Currency of the prices
    }, 
    { timestamps: true }
);  // Automatically manage createdAt and updatedAt


// Indexing for faster queries
candle.index({ symbol: 1, dateTime: 1 }, { unique: true });

const Candle = mongoose.model('Candle', candle, 'candles');

export default Candle;
