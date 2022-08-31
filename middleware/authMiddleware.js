import jwt from "jsonwebtoken";
import userServices from "../services/userServices.js";

const jwtMiddleware = async (req, res, next) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw { message: "Missing JWT Secret" };
    }

    if (!req?.params?.email) {
        throw { message: "Missing email" };
    }

    const user = await userServices.getUserEmail(req.params.email);
    const token = user.token;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        try {
            if (err) {
                res.status(403).send("Invalid Token");
            } else {
                next();
            }
        } catch (e) {
            res.status(422).send("Invalid Token");
        }
    })
}

export default jwtMiddleware;