import mongoose from 'mongoose';

// Favorite schema
const favorite = new mongoose.Schema({
    symbol: {
        type: String,
        ref: 'Exchange',  // Reference to the Exchange model
        required: true,
        unique: true  // Ensure a favorite is unique for each symbol
    },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Ensure population uses the `symbol` field of Exchange
favorite.virtual('exchange', {
    ref: 'Exchange',
    localField: 'symbol',  // Field in Favorite
    foreignField: 'symbol',  // Field in Exchange
    justOne: true  // Each favorite references a single exchange
});

favorite.set('toObject', { virtuals: true });
favorite.set('toJSON', { virtuals: true });

const Favorite = mongoose.model('Favorite', favorite, 'favorites');

export default Favorite;
