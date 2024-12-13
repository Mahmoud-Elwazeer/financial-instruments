import * as candleServices from './../services/candle.js';
import asyncHandler from 'express-async-handler'

// @desc  Fetch a list of all candle data for a specific financial instrument.
// @route get /api/v1/candles/:symbol
export const getAll = asyncHandler(async(req, res, next) => {
    const candles = await candleServices.getAll(req);
    res.status(200).json({message: 'Candles Retrieved successfully', candles});
});




