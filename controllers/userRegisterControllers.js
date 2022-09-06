import userServices from "../services/userServices.js"
import userAddressServices from "../services/userAddressServices.js";
import userDetailsServices from "../services/userDetailsServices.js";
import bcrypt from "bcrypt";

const userRegister = async (req, res, next) => {
    try {
        const address = await userAddressServices.addAddress({
            city: req.body.city,
            country: req.body.country,
            detaliedAddress: req.body.detaliedAddress
        })

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = await userServices.addUser({
            username: req.body.username,
            password: hashPassword,
            email: req.body.email,
        })

        // Date Format: MM/DD/YYYY
        const dateSplit = req.body.dob.split("/");
        const newDate = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;

        const response = await userDetailsServices.addUserDetails({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            dob: new Date(newDate).toISOString(),
            user: {
                connect: {
                    id: user.id
                }
            },
            userAddress: {
                connect: {
                    id: address.id
                }
            }
        })
        res.json(response);
    } catch (err) {
        console.error("Error while register an user");
        next(err);
    }
};

export default { userRegister };