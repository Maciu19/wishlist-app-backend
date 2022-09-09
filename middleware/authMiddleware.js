import jwt from "jsonwebtoken";
import userServices from "../services/userServices.js";

const jwtMiddleware = async (req, res, next) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw { message: "Missing JWT Secret" };
    }

    if (!req?.params?.email) {
        throw { message: "Missing email" };
    }

    const email = req.params.email;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
        return res.status(401).send("Invalid Token");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        try {
            if (err) {
                await userServices.updateUser(user.email, { token: null });
                res.status(403).send("Invalid Token");
            } else {
                if (decoded.user.email !== email) {
                    res.status(401).send("Unauthorized");
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