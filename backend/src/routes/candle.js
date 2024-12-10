import express from 'express';
import { getAll } from '../controllers/candle.js';

const router = express.Router();

router.get('/:symbol', getAll);

export { router as candleRoutes };
