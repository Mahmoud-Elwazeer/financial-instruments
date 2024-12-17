// for handling logging

const logMiddleware = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
};

export default logMiddleware
