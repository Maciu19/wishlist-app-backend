import jwt from "jsonwebtoken";

const jwtMiddleware = async (req, res, next) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw { message: "Missing JWT Secret" };
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send("Unauthorized");
        return;
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        try {
            if (err) {
                res.status(403).send("Invalid Token");
            } else {
                if (req.params.username === decoded.user) {
                    next();
                } else {
                    res.status(401).send("Unauthorized");
                }
            }
        } catch (e) {
            res.status(422).send("Invalid Token");
        }
    })
}

export default jwtMiddleware;