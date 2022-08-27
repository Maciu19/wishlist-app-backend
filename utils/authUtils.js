import jwt from "jsonwebtoken";

const generateAuthToken = (username) => {
    return jwt.sign(
        { user: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" });
}

export default { generateAuthToken };