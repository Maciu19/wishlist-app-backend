import groupServices from "../services/groupServices.js";
import userServices from "../services/userServices.js";
import wishlistServices from "../services/wishlistServices.js";

const getGroups = async (req, res, next) => {
    try {
        res.json(await groupServices.getAll());
    } catch (err) {
        console.error("Error while getting all groups");
        next(err);
    }
}

const getGroup = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await groupServices.getGroup(req.params.id);
        if (!response) {
            throw { message: "No group found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one group");
        next(err);
    }
}

const getGroupUsersWishlists = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const group = await groupServices.getGroup(req.params.id);
        if (!group) {
            throw { message: "No group found" };
        }
        const name = group.name;
        const id = group.id;

        const users = [];
        const usersInGroup = group.userInGroup;
        for (let userInGroup of usersInGroup) {
            let user = await userServices.getUserId(userInGroup.userId);
            users.push(user);
        }

        const wishlists = [];
        const groupWishlists = group.groupWishlist;
        for (let groupWishlist of groupWishlists) {
            let wishlist = await wishlistServices.getWishlistById(groupWishlist.wishlistId);
            wishlists.push(wishlist);
        }

        const response = {
            users, wishlists, name, id
        }

        res.json(response);
    } catch (err) {
        console.error("Error while getting one group");
        next(err);
    }
}

const addGroup = async (req, res, next) => {
    try {
        const response = await groupServices.addGroup({
            name: req.body.name
        });
        res.json(response);
    } catch (err) {
        console.error("Error while adding one group");
        next(err);
    }
}

const updateGroup = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const id = req.params.id;
        const group = await groupServices.getGroup(id);

        if (!group) {
            throw { message: "Group not found" };
        }

        const response = await groupServices.updateGroup(id, {
            name: req?.body?.name || group.name
        });

        res.json(response);
    } catch (err) {
        console.error("Error while updating one group");
        next(err);
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await groupServices.deleteGroup(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while adding one group");
        next(err);
    }
}

export default { getGroups, getGroup, getGroupUsersWishlists, addGroup, updateGroup, deleteGroup };

