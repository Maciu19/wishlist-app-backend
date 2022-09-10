import jwt from "jsonwebtoken";
import userServices from "../services/userServices.js";

const jwtMiddleware = async (req, res, next) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw { message: "Missing JWT Secret" };
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send("Authorization header missing");
    }

    if (!authHeader.startsWith("Bearer")) {
        return res.status(401).send("Invalid authorization header");
    }

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Token missing");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        try {
            if (err) {
                // If the token expires, in the database won't change to "null"
                res.status(403).send("Invalid Token");
            } else {
                // When the user is deleted, and the token remains availabe
                const user = await userServices.getUserEmail(decoded.user.email);
                if (!user) {
                    res.status(403).send("Invalid User");
                    return;
                }
                req.user = decoded;
                next();
            }
        } catch (e) {
            res.status(422).send("Invalid Token");
        }
    })
}

export default jwtMiddleware;