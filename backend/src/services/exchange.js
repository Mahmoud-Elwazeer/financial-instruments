import ApiError from "../utils/apiError.js";
import Exchange from '../models/exchange.js';
import client from "../configurations/redis.js";
import getDataFromRedis from "../utils/redis.js";
import 'dotenv/config';

const expireTime = process.env.ExpiryTimeForCache || 3600;

export const getAll = async(req) => {
    // Get query parameters for pagination
    const { type, country, currency} = req.query;
    
    // Build the query object for filtering
    const query = {};

    // Support multiple values for type, country, and currency
    if (type) {
        const types = Array.isArray(type) ? type : type.split(',');
        query.type = { $in: types };
    }
    if (currency) {
        const currencies = Array.isArray(currency) ? currency : currency.split(',');
        query.currency = { $in: currencies };
    }
    if (country) {
        const countries = Array.isArray(country) ? country : country.split(',');
        query.country = { $in: countries };
    }

    const cacheKey = `exchanges:${JSON.stringify(query)}`;

    // First check if data exists in the cache
    const exchangesData = await getDataFromRedis(cacheKey);
    
    if (exchangesData) {
        return exchangesData;
    }

    const exchanges = await Exchange.find(query)

    if ((type || currency || country) && (!exchanges || exchanges.length === 0))
        throw new ApiError('No Exchanges found for the selected Filtration. Please adjust Filtration and try again', 404)
    
    if (!exchanges || exchanges.length === 0)
        throw new ApiError('Not Found Exchanges', 404);

    const totalExchanges = await Exchange.countDocuments(query);

    const data = {
        totalItems: totalExchanges,
        data: exchanges,
    }

    // Cache the result in Redis with an expiration time of 1 hour
    client.setEx(cacheKey, expireTime, JSON.stringify(data));
    return data
}

export const getOne = async(symbol) => {
    const exchange = await Exchange.findOne({ symbol });
    if (!exchange)
        throw new ApiError('Not Found Exchange', 404);

    return exchange
}


export const getExchangeFilters = async(req) => {
   // Aggregate unique values for type, currency, and country, sorted alphabetically
    const filters = await Exchange.aggregate([
    {
        $facet: {
            types: [
                { $group: { _id: "$type" } },
                { $sort: { _id: 1 } } // Sort types alphabetically
            ],
            currencies: [
                { $group: { _id: "$currency" } },
                { $sort: { _id: 1 } } // Sort currencies alphabetically
            ],
            countries: [
                { $group: { _id: "$country" } },
                { $sort: { _id: 1 } } // Sort countries alphabetically
            ]
        }
    },
    {
        $project: {
            types: { $map: { input: "$types", as: "type", in: "$$type._id" } },
            currencies: { $map: { input: "$currencies", as: "currency", in: "$$currency._id" } },
            countries: { $map: { input: "$countries", as: "country", in: "$$country._id" } }
        }
    }
    ]);

    return filters.length > 0 ? filters[0] : { types: [], currencies: [], countries: [] };
}



// using pagination for feature
// export const getAll = async(req) => {
//      // Get query parameters for pagination
//     const { type, country, currency, page = 1, limit = 10 } = req.query;

//     // Calculate the number of documents to skip (pagination logic)
//     const skip = (page - 1) * limit;
    
//     // Build the query object for filtering
//     const query = {};

//     // Support multiple values for type, country, and currency
//     if (type) {
//         const types = Array.isArray(type) ? type : type.split(',');
//         query.type = { $in: types };
//     }
//     if (currency) {
//         const currencies = Array.isArray(currency) ? currency : currency.split(',');
//         query.currency = { $in: currencies };
//     }
//     if (country) {
//         const countries = Array.isArray(country) ? country : country.split(',');
//         query.country = { $in: countries };
//     }

//     // Fetch exchanges with pagination
//     const exchanges = await Exchange.find(query)
//     .skip(skip)
//     .limit(parseInt(limit))  // Ensure limit is an integer
//     .exec();

//     if (!exchanges || exchanges.length === 0)
//         throw new ApiError('Not Found Exchanges', 404);

//     // Get total count of documents for pagination info
//     const totalExchanges = await Exchange.countDocuments(query);

//     // Prepare pagination response
//     const pagination = {
//     currentPage: parseInt(page),
//     totalPages: Math.ceil(totalExchanges / limit),
//     totalItems: totalExchanges,
//     };

//     const data = {
//         pagination,
//         data: exchanges,
//     }

//     return data
// }

