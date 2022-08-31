import jwt from "jsonwebtoken";

const generateAuthToken = (email, password) => {
    return jwt.sign(
        {
            user: {
                email, password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
}

export default { generateAuthToken };