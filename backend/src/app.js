import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import { handleRoutes } from './routes/index.js'
import { globalError } from './middlewares/errorMiddleware.js';
import dbConnection from './configurations/database.js'
import cors from 'cors'

// env
const PORT = process.env.PORT || 3000;

// connect with database
dbConnection();

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

// Start server
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
}


