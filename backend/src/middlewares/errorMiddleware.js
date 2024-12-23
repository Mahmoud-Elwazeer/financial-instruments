// Global error Handling middleware
import 'dotenv/config'

const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; 
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'dev') {
        sendErrorForDev(err ,res)
    } else {
        sendError(err, res)
    }
}

const sendErrorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        // stack: err.stack,
        });
    }

const sendError = (err, res) => {
    res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    });
}

export default globalError