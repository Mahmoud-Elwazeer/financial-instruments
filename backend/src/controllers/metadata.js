import * as metadataServices from './../services/metadata.js';
import asyncHandler from 'express-async-handler'

// @desc  Fetch metadata for a specific financial instrument by its symbol.
// @route get /api/v1/metadata/:symbol
export const getOne = asyncHandler(async(req, res, next) => {
    const metadata = await metadataServices.getOne(req);
    res.status(200).json({message: 'Metadata Retrieved successfully', metadata});
});




