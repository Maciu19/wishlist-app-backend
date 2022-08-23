const requestMiddleware = (req, res, next) => {
    console.log(`${req.method} request made at ${new Date().toString()}`);
    next();
}

export default requestMiddleware;