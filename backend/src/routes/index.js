import ApiError from '../utils/apiError.js'
import { exchangeRoutes } from './exchange.js'
import { candleRoutes } from './candle.js';
import { metadataRoutes } from './metadata.js';


export const handleRoutes = (app) => {
    app.get('/', (_, res) => res.json({ message: 'welcome to financial instruments' }));
    app.use('/api/v1/exchanges', exchangeRoutes);
    app.use('/api/v1/candles', candleRoutes);
    app.use('/api/v1/metadata', metadataRoutes);

    app.all('*', (req, res, next) => {
        next(new ApiError(`Can't find this route ${req.originalUrl}`, 404))
    })
}
