import express from 'express';
import { getAll, getOne, getExchangeFilters } from '../controllers/exchange.js';

const router = express.Router();

router.get('/', getAll);
router.get('/filters', getExchangeFilters);
router.get('/:symbol', getOne);

export { router as exchangeRoutes };
