import ApiError from "../utils/apiError.js";
import Favorite from '../models/favorite.js';
import * as exchangeServices from './../services/exchange.js';

export const create = async(req) => {
    // Check if the exchange exists
    const { symbol } = req.body;
    if (!symbol)
        throw new ApiError('symbol not found', 400);

    const exchange = await exchangeServices.getOne(symbol);

    const checkFavorite = await getOne(symbol);
    if (checkFavorite)
        throw new ApiError('This exchange added before', 400);

    // Create a new favorite
    const favorite = new Favorite({ symbol });
    await favorite.save();

    return favorite;
}


export const getOne = async(symbol) => {
    const favorite = await Favorite.findOne({ symbol });
    if (!favorite)
        return;

    return favorite
}

export const getAll = async() => {
    const favorites = await Favorite.find()
            .populate('exchange')
            .exec();
    
    if (!favorites || favorites.length === 0)
        throw new ApiError('Not Found Favorites', 400);

    const totalFavorites = await Favorite.countDocuments();

    const data = {
        totalItems: totalFavorites,
        data: favorites,
    }

    return data;
}

export const deleteOne =  async(symbol) => {

    // Remove the favorite by symbol
    const favorite = await Favorite.findOneAndDelete({ symbol });
    if (!favorite) {
        throw new ApiError('Not Found in Favorites', 404);
    }

    return favorite;
}