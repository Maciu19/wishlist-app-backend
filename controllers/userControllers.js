import userServices from "../services/userServices.js"
import userDetailsServices from "../services/userDetailsServices.js";
import userAddressServices from "../services/userAddressServices.js";
import authUtil from "../utils/authUtils.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res, next) => {
    try {
        res.json(await userServices.getAll());
    } catch (err) {
        console.error("Error while getting all users");
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const response = await userServices.getUserEmail(req.user.user.email);
        if (!response) {
            throw { message: "No user found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one user");
        next(err);
    }
}

const addUser = async (req, res, next) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const response = await userServices.addUser({
            username: req.body.username,
            password: hashPassword,
            email: req.body.email
        });
        res.json(response);
    } catch (err) {
        console.error("Error while adding an user");
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const email = req.user.user.email;
        const user = await userServices.getUserEmail(email);

        const hashPassword = req?.body?.password && await bcrypt.hash(req.body.password, 10);

        // Email cannot be change
        const response = await userServices.updateUser(email, {
            username: req?.body?.username || user.username,
            password: hashPassword || user.password,
        });

        res.json(response);
    } catch (err) {
        console.error("Error while updating an user");
        next(err);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        const userInfo = await userServices.getUserEmail(req.user.user.email);

        const deleteUserDetails = await userDetailsServices.deleteUserDetails(userInfo.userDetails.id);
        const deleteUserAddress = await userAddressServices.deleteAddress(userInfo.userDetails.userAddressId);
        const deleteUser = await userServices.deleteUser(req.user.user.email);
        res.json({ message: userInfo });
    } catch (err) {
        console.error("Error while deleting an user");
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await userServices.getUserEmail(req.body.email);
        if (!user) {
            throw { message: "Cannot find user" };
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = authUtil.generateAuthToken(user.email, user.password);
            const response = await userServices.updateUser(user.email, {
                token: token
            })
            res.json(response);
        } else {
            throw { message: "Not allowed" };
        }

    } catch (err) {
        console.error("Error with login");
        next(err);
    }
}

export default { getUsers, getUser, addUser, updateUser, deleteUser, loginUser };