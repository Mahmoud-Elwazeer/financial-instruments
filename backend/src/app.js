import express from "express";
import helmet from "helmet";
import { handleRoutes } from './routes/index.js'
import { globalError } from './middlewares/errorMiddleware.js';
import cors from 'cors'


// app
const app = express();

// Security
app.use(helmet());
app.disable("x-powered-by");

// Receiving JSON Data
app.use(express.json());

app.use(cors());

// call routes
handleRoutes(app);

// must be after all routes middleware for handle error
app.use(globalError);

export default app;
