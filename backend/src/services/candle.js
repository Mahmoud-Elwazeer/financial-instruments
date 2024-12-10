import ApiError from "../utils/apiError.js";
import Candle from '../models/candle.js';

// Helper function to validate date
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export const getAll = async(req) => {
    const { symbol } = req.params;
    const { from, to } = req.query;

    const query = { symbol };

    // Validate dates
    let fromDate, toDate;
    if (from && !isValidDate(from)) {
        throw new ApiError('"from" parameter is not a valid date.', 400);
    }
    if (to && !isValidDate(to)) {
        throw new ApiError('"to" parameter is not a valid date.', 400);
    }
    if (from) fromDate = new Date(from);
    if (to) toDate = new Date(to);

    // Check if toDate is greater than or equal to fromDate
    if (fromDate && toDate && toDate < fromDate) {
        throw new ApiError('"to" parameter must be greater than or equal to the "from" parameter.', 400);
    }

    // Add date range filter if `from` and `to` are provided
    if (fromDate || toDate) {
        query.dateTime = {};
        if (fromDate) query.dateTime.$gte = fromDate;
        if (toDate) query.dateTime.$lte = toDate;
    }

    // Fetch the candles from the database
    const candles = await Candle.find(query);

    if (!candles || candles.length === 0) {
        throw new ApiError('Not Found Candles', 404);
    }

     // Get total count of documents for pagination info
    const totalCandles = await Candle.countDocuments(query);

    // Prepare pagination response
    const data = {
        totalItems: totalCandles,
        data: candles
    };

    return data;
}
