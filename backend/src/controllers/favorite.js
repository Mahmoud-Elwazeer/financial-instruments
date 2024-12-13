import * as favoriteServices from './../services/favorite.js';
import asyncHandler from 'express-async-handler'

// @desc  allow users to add an exchnage to their favorites
// @route post /api/v1/favorites
export const create = asyncHandler(async(req, res, next) => {
    const favorite = await favoriteServices.create(req);
    res.status(201).json({message: 'Favorite added successfully', favorite});
});

// @desc  retrieve all their favorite exchanges
// @route get /api/v1/favorites
export const getAll = asyncHandler(async(req, res, next) => {
    const favorites = await favoriteServices.getAll(req);
    res.status(200).json({message: 'Favorites Retrieved successfully', favorites});
});

// @desc  remove an exchange from their favorites.
// @route delete /api/v1/favorites/:symbol
export const deleteOne = asyncHandler(async(req, res, next) => {
    const { symbol } = req.params;
    await favoriteServices.deleteOne(symbol);
    res.status(204).json({message: 'Favorite Removed successfully'});
});

