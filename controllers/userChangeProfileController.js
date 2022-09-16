import userServices from "../services/userServices.js"
import userDetailsServices from "../services/userDetailsServices.js";
import userAddressServices from "../services/userAddressServices.js";
import bcrypt from "bcrypt";

const changeProfileDetails = async (req, res, next) => {
    try {
        // Find the user
        const user = await userServices.getUserEmail(req.user.user.email);
        if (!user) {
            throw { message: "No user found" };
        }

        // Update User Credientials [Without email]
        const hashPassword = req?.body?.password && await bcrypt.hash(req.body.password, 10);
        const userUpdate = await userServices.updateUser(user.email, {
            username: req?.body?.username || user.username,
            password: hashPassword || user.password,
        });

        //Update User Details
        const responseObj = {
            firstName: req?.body?.firstName || user.userDetails.firstName,
            lastName: req?.body?.lastName || user.userDetails.lastName,
            phone: req?.body?.phone || user.userDetails.phone,
        };

        if (req?.body?.dob) {
            const newDate = new Date(req.body.dob)
            responseObj.dob = newDate;
        }

        const userDetailsUpdate = await userDetailsServices.updateUserDetails(user.userDetails.id, responseObj);

        //Update User Address
        const userAddress = await userAddressServices.getAddress(user.userDetails.userAddressId);
        const userAddressUpdate = await userAddressServices.updateAddress(userAddress.id, {
            city: req?.body?.city || userAddress.city,
            country: req?.body?.country || userAddress.country,
            completeAddress: req?.body?.completeAddress || userAddress.completeAddress
        })

        const userUpdated = await userServices.getUserEmail(req.user.user.email);
        if (!user) {
            throw { message: "No user found" };
        }
        res.json(userUpdated);
    } catch (err) {
        console.error("Error while changing one user details");
        next(err);
    }
};

export default { changeProfileDetails };