import jwt from "jsonwebtoken";
import getMinutesDiff from "../utils/minutesDiffUtils.js";
import userServices from "../services/userServices.js";

const jwtMiddleware = async (req, res, next) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw { message: "Missing JWT Secret" };
    }

    if (!req?.params?.email) {
        throw { message: "Missing email" };
    }

    const user = await userServices.getUserEmail(req.params.email);
    if (user.token === undefined) {
        throw { message: "Token invalid" };
    }
    const token = user.token;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        try {
            if (err) {
                res.status(403).send("Invalid Token");
            } else {
                const iat = new Date(decoded.iat * 1000);
                const now = new Date();
                const minutes = getMinutesDiff(iat, now);

                if (minutes > 59) {
                    await userServices.updateUser(user.email, { token: null })
                }

                // console.log(minutes, user);
                next();
            }
        } catch (e) {
            res.status(422).send("Invalid Token");
        }
    })
}

export default jwtMiddleware;