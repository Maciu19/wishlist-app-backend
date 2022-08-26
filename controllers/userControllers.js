import userServices from "../services/userServices.js"
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
        if (!req?.params?.username) {
            throw { message: "No paramter provided" };
        }
        const response = await userServices.getUserUsername(req.params.username);
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
        if (!req?.body?.username && !req?.body?.password && !req?.body?.email) {
            throw { message: "No parameter provided" };
        }

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
        if (!req?.params?.username) {
            throw { message: "No parameter provided" };
        }

        const username = req.params.username;
        const user = await userServices.getUserUsername(username);

        const hashPassword = req?.body?.password && await bcrypt.hash(req.body.password, 10);

        const response = await userServices.updateUser(username, {
            username: req?.body?.username || user.username,
            password: hashPassword || user.password,
            email: req?.body?.email || user.email
        });

        res.json(response);
    } catch (err) {
        console.error("Error while updating an user");
        next(err);
    }
};

const updateUser2 = async (req, res, next) => {
    try {
        if (!req?.params?.username) {
            throw { message: "No parameter provided" };
        }

        const hashPassword = req?.body?.password && await bcrypt.hash(req.body.password, 10);

        const response = await userServices.updateUser(req.params.username, {
            username: req?.body?.username,
            password: hashPassword,
            email: req?.body?.email
        });

        res.json(response);
    } catch (err) {
        console.error("Error while updating 2 an user");
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        if (!req?.params?.username) {
            throw { message: "No paramter provided" };
        }

        const reponse = await userServices.deleteUser(req.params.username);
        res.json({ message: reponse });
    } catch (err) {
        console.error("Error while deleting an user");
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    try {
        if (!req?.body?.username && !req?.body?.password) {
            throw { message: "No paramter provided" };
        }

        const user = await userServices.getUserUsername(req.body.username);
        if (!user) {
            throw { message: "Cannot find user" };
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = authUtil.generateAuthToken(user);
            res.send({
                token
            })
        } else {
            throw { message: "Not allowed" };
        }

    } catch (err) {
        console.error("Error with login");
        next(err);
    }
}

export default { getUsers, getUser, addUser, updateUser, updateUser2, deleteUser, loginUser };