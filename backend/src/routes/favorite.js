import express from 'express';
import { create, getAll, deleteOne } from '../controllers/favorite.js';

const router = express.Router();

router.route('/')
    .post(create)
    .get(getAll);

router.delete('/:symbol', deleteOne);

export { router as favoriteRoutes };
