import userDetailsServices from "../services/userDetailsServices.js"
import userServices from "../services/userServices.js";
import userAddressServices from "../services/userAddressServices.js";

const getAllUserDetails = async (req, res, next) => {
    try {
        res.json(await userDetailsServices.getAllUserDetails());
    } catch (err) {
        console.error("Error while getting details about all users");
        next(err);
    }
}

const getUserDetails = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await userDetailsServices.getUserDetails(req.params.id);
        res.json(response);
    } catch (err) {
        console.error("Error while getting one user details");
        next(err);
    }
}

const addUserDetails = async (req, res, next) => {
    try {
        const user = await userServices.getUserEmail(req.body.email);
        if (!user) {
            throw { message: "No user found" }
        }

        const address = await userAddressServices.getAddress(req.body.addressId)
        if (!address) {
            throw { message: "No address found" }
        }

        const response = await userDetailsServices.addUserDetails({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            dob: new Date(req.body.dob),
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
        });
        res.json(response);
    } catch (err) {
        console.error("Error while adding one user details");
        next(err);
    }
};

const updateUserDetails = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const userDetailsIntial = userDetailsServices.getUserDetails(req.params.id);
        if (!userDetailsIntial) {
            throw { message: "user details not found" }
        }

        const responseObj = {
            firstName: req?.body?.firstName || userDetailsIntial.firstName,
            lastName: req?.body?.lastName || userDetailsIntial.lastName,
            phone: req?.body?.phone || userDetailsIntial.phone,
        };

        if (req?.body?.dob) {
            const newDate = new Date(req.body.dob)
            responseObj.dob = newDate;
        }

        if (req?.body?.email) {
            const user = await userServices.getUserEmail(req.body.email);
            if (!user) {
                throw { message: "No user found" }
            }

            responseObj.user = {
                connect: {
                    id: user.id
                }
            }
        }

        if (req?.body?.addressId) {
            const address = await userAddressServices.getAddress(req.body.addressId)
            if (!address) {
                throw { message: "No address found" }
            }

            responseObj.userAddress = {
                connect: {
                    id: address.id
                }
            }
        }

        const response = await userDetailsServices.updateUserDetails(req.params.id, responseObj);
        res.json(response);
    } catch (err) {
        console.error("Error while updating an user details");
        next(err);
    }
};

const deleteUserDetails = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await userDetailsServices.deleteUserDetails(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while updating an user details");
        next(err);
    }
}

export default { getAllUserDetails, getUserDetails, addUserDetails, updateUserDetails, deleteUserDetails };