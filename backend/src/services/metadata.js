import ApiError from "../utils/apiError.js";
import Metadata from '../models/metadata.js';


export const getOne = async(req) => {
    const { symbol } = req.params;

    const metadata = await Metadata.findOne({ symbol });
    if (!metadata)
        throw new ApiError('Not Found Metadata', 404);

    return metadata
}
