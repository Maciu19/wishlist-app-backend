import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        res.status(400).json({ errors: validationErrors.array() });
    } else {
        next();
    }
}

export default validationMiddleware;