import ApiError from "../utils/apiError.js";
import Exchange from '../models/exchange.js';

export const getAll = async(req) => {
     // Get query parameters for pagination
    const { type, country, currency, page = 1, limit = 10 } = req.query;

    // Calculate the number of documents to skip (pagination logic)
    const skip = (page - 1) * limit;
    
    // Build the query object for filtering
    const query = {};
    if (type) query.type = type;
    if (currency) query.currency = currency;
    if (currency) query.country = country;

    // Fetch exchanges with pagination
    const exchanges = await Exchange.find(query)
    .skip(skip)
    .limit(parseInt(limit))  // Ensure limit is an integer
    .exec();

    if (!exchanges || exchanges.length === 0)
        throw new ApiError('Not Found Exchanges', 404);

    // Get total count of documents for pagination info
    const totalExchanges = await Exchange.countDocuments(query);

    // Prepare pagination response
    const pagination = {
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalExchanges / limit),
    totalItems: totalExchanges,
    };

    const data = {
        pagination,
        data: exchanges,
    }

    return data
}


export const getOne = async(req) => {
    const { symbol } = req.params;

    const exchange = await Exchange.findOne({ symbol });
    if (!exchange)
        throw new ApiError('Not Found Exchange', 404);

    return exchange
}