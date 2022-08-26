import jwt from "jsonwebtoken";

const generateAuthToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

export default { generateAuthToken };