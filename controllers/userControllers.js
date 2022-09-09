import userServices from "../services/userServices.js"
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
        if (!req?.params?.email) {
            throw { message: "No paramter provided" };
        }

        const response = await userServices.getUserEmail(req.params.email);
        if (!response) {
            throw { message: "No user found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one user");
        next(err);
    }
}

const getUserToken = async (req, res, next) => {
    try {
        if (!req?.params?.email) {
            throw { message: "No paramter provided" };
        }

        const response = await userServices.getUserEmail(req.params.email);
        if (!response) {
            throw { message: "No user found" };
        }
        res.json(response.token);
    } catch (err) {
        console.error("Error while getting one user token");
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
        if (!req?.params?.email) {
            throw { message: "No parameter provided" };
        }

        const email = req.params.email;
        const user = await userServices.getUserEmail(email);

        const hashPassword = req?.body?.password && await bcrypt.hash(req.body.password, 10);

        const response = await userServices.updateUser(email, {
            username: req?.body?.username || user.username,
            password: hashPassword || user.password,
            email: req?.body?.email || user.email
        });

        res.json(response);
    } catch (err) {
        console.error("Error while updating POST an user");
        next(err);
    }
};

const updateUser2 = async (req, res, next) => {
    try {
        if (!req?.params?.email) {
            throw { message: "No parameter provided" };
        }

        const hashPassword = req?.body?.password && await bcrypt.hash(req.body.password, 10);

        const response = await userServices.updateUser(req.params.email, {
            username: req?.body?.username,
            password: hashPassword,
            email: req?.body?.email
        });

        res.json(response);
    } catch (err) {
        console.error("Error while updating PUT an user");
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        if (!req?.params?.email) {
            throw { message: "No paramter provided" };
        }

        const reponse = await userServices.deleteUser(req.params.email);
        res.json({ message: reponse });
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
            res.json(response.token);
        } else {
            throw { message: "Not allowed" };
        }

    } catch (err) {
        console.error("Error with login");
        next(err);
    }
}

export default { getUsers, getUser, getUserToken, addUser, updateUser, updateUser2, deleteUser, loginUser };