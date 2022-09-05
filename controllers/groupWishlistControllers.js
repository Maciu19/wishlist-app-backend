import groupWishlistServices from "../services/groupWishlistServices.js";
import wishlistServices from "../services/wishlistServices.js";
import groupServices from "../services/groupServices.js";

const getGroupsWishlists = async (req, res, next) => {
    try {
        res.json(await groupWishlistServices.getAll());
    } catch (err) {
        console.error("Error while getting all groupsWishlists");
        next(err);
    }
}

const getGroupWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await groupWishlistServices.getGroupWishlist(req.params.id);

        if (!response) {
            throw { message: "No paramter provided" };
        }

        res.json(response);
    } catch (err) {
        console.error("Error while getting one groupWishlist");
        next(err);
    }
}

const addGroupWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistServices.getWishlistByName(req.body.wishlistName);
        if (!wishlist) {
            throw { message: "No wishlist found" };
        }

        const group = await groupServices.getGroup(req.body.groupName);
        if (!group) {
            throw { message: "No group found" };
        }

        const response = await groupWishlistServices.addGroupWishlist({
            wishlist: {
                connect: {
                    id: wishlist.id
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
        console.error("Error while adding one groupWishlist");
        next(err);
    }
}

const updateGroupWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const groupWishlist = await groupWishlistServices.getGroupWishlist(req.params.id);

        if (!groupWishlist) {
            throw { message: "groupWishlist not found" };
        }

        const objectResponse = {};

        if (req?.body?.wishlistName) {
            const newWishlist = await wishlistServices.getWishlistByName(req.body.wishlistName);
            if (!newWishlist) {
                throw { message: "No wishlist found" };
            }

            objectResponse.wishlist = {
                connect: {
                    id: newWishlist.id
                }
            }
        }

        if (req?.body?.groupName) {
            const newGroup = await groupServices.getGroup(req.body.groupName);
            if (!newGroup) {
                throw { message: "No group found" };
            }
            objectResponse.group = {
                connect: {
                    id: newGroup.id
                }
            }
        }
        const response = await groupWishlistServices.updateGroupWishlist(req.params.id, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one groupWishlist");
        next(err);
    }
}

const deleteGroupWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await groupWishlistServices.deleteGroupWishlist(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting one groupWishlist");
        next(err);
    }
}

export default { getGroupsWishlists, getGroupWishlist, addGroupWishlist, updateGroupWishlist, deleteGroupWishlist };