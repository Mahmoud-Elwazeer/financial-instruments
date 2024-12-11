import * as exchangeServices from './../services/exchange.js';
import asyncHandler from 'express-async-handler'

// @desc Fetch a list of all exchanges.
// @route get /api/v1/exchanges
export const getAll = asyncHandler(async(req, res, next) => {
    const exchanges = await exchangeServices.getAll(req);
    res.status(200).json({message: 'Exchanges Retrieved successfully', exchanges});
});


// @desc Fetch detailed information about a specific exchange by its symbol.
// @route get /api/v1/exchanges/:symbol
export const getOne = asyncHandler(async(req, res, next) => {
    const exchange = await exchangeServices.getOne(req);
    res.status(200).json({message: 'Exchange Retrieved successfully', exchange});
});


// @desc Returns unique values of type, currency, and country fields 
// from the exchanges collection for use in filtering.
// @route get /api/v1/exchanges/filters
export const getExchangeFilters = asyncHandler(async(req, res, next) => {
    const filters = await exchangeServices.getExchangeFilters(req);
    res.status(200).json({message: 'Filters Retrieved successfully', filters});
});
