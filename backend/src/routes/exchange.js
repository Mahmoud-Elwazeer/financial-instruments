import express from 'express';
import { getAll, getOne } from '../controllers/exchange.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:symbol', getOne);

export { router as exchangeRoutes };
