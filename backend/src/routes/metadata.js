import express from 'express';
import { getOne } from '../controllers/metadata.js';

const router = express.Router();

router.get('/:symbol', getOne);

export { router as metadataRoutes };
