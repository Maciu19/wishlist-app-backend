import userGroupsServices from "../services/userGroupsServices.js";
import userServices from "../services/userServices.js";
import groupServices from "../services/groupServices.js";
import notificationServices from "../services/notificationServices.js";

const getUsersInGroups = async (req, res, next) => {
    try {
        res.json(await userGroupsServices.getAll());
    } catch (err) {
        console.error("Error while getting all users in groups");
        next(err);
    }
}

const getUserInGroup = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await userGroupsServices.getUserInGroup(req.params.id);
        res.json(response);
    } catch (err) {
        console.error("Error while getting one user in one group");
        next(err);
    }
}

const getOwnerInGroup = async (req, res, next) => {
    try {
        if (!req?.params?.groupId) {
            throw { message: "No paramter provided" };
        }
        const response = await userGroupsServices.getOwnerInGroup(req.params.groupId);
        res.json(response);
    } catch (err) {
        console.error("Error while getting owner of one group");
        next(err);
    }
}

const addUserInGroupOwner = async (req, res, next) => {
    try {
        // from token
        const user = await userServices.getUserEmail(req.user.user.email);
        if (!user) {
            throw { message: "No user found" };
        }

        const group = await groupServices.addGroup({
            name: req.body.name
        });

        const response = await userGroupsServices.addUserInGroup({
            isOwner: true,
            user: {
                connect: {
                    id: user.id
                }
            },
            group: {
                connect: {
                    id: group.id
                }

            }
        });
        res.json(response);
    } catch (err) {
        console.error("Error while adding one user in one group");
        next(err);
    }
}

const addUserInGroup = async (req, res, next) => {
    try {
        const user = await userServices.getUserUsername(req.body.username);
        if (!user) {
            throw { message: "No user found" };
        }

        const group = await groupServices.getGroup(req.body.groupId)
        if (!group) {
            throw { message: "No group found" };
        }

        if (req.body.isOwner === false) {
            const owner = await userGroupsServices.getOwnerInGroup(req.params.groupId);
            notificationServices.addNotification({
                details: `${user.username} joined in your group: "${group.name}"`,
                category: "GROUP",
                user: {
                    connect: {
                        id: owner.user.id
                    }
                }
            })
        }

        const response = await userGroupsServices.addUserInGroup({
            isOwner: req.body.isOwner,
            user: {
                connect: {
                    id: user.id
                }
            },
            group: {
                connect: {
                    id: group.id
                }

            }
        });
        res.json(response);
    } catch (err) {
        console.error("Error while adding one user in one group");
        next(err);
    }
}

const updateUserInGroup = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const userInGroup = await userGroupsServices.getUserInGroup(req.params.id);

        if (!userInGroup) {
            throw { message: "UserGroup not found" };
        }

        const objectResponse = {};
        if (req?.body?.isOwner === true || req?.body?.isOwner === false) {
            objectResponse.isOwner = req.body.isOwner;
        }

        if (req?.body?.username) {
            const newUser = await userServices.getUserUsername(req.body.username);
            if (!newUser) {
                throw { message: "No user found" };
            }

            objectResponse.user = {
                connect: {
                    id: newUser.id
                }
            }
        }

        if (req?.body?.groupId) {
            const newGroup = await groupServices.getGroup(req.body.groupId);
            if (!newGroup) {
                throw { message: "No group found" };
            }
            objectResponse.group = {
                connect: {
                    id: newGroup.id
                }
            }
        }
        const response = await userGroupsServices.updateUserInGroup(req.params.id, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one user one group");
        next(err);
    }
}

const deleteUserInGroup = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await userGroupsServices.deleteUserInGroup(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting one wishlist");
        next(err);
    }
}

export default { getUsersInGroups, getUserInGroup, getOwnerInGroup, addUserInGroup, addUserInGroupOwner, updateUserInGroup, deleteUserInGroup };
