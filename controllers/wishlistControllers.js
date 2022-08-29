import userServices from "../services/userServices.js";
import wishlistServices from "../services/wishlistServices.js";

const getWishlists = async (req, res, next) => {
    try {
        res.json(await wishlistServices.getAll());
    } catch (err) {
        console.error("Error while getting all wishlists");
        next(err);
    }
}

const getWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await wishlistServices.getWishlist(req.params.id);

        if (!response) {
            throw { message: "No wishlist found" };
        }

        res.json(response);
    } catch (err) {
        console.error("Error while getting one wishlist");
        next(err);
    }
}

const addWishlsit = async (req, res, next) => {
    try {
        const user = await userServices.getUserUsername(req.body.username);
        if (!user) {
            throw { message: "No user found" };
        }

        const response = await wishlistServices.addWishlist({
            owner: {
                connect: {
                    id: user.id
                }
            }
        });

        res.json(response);
    } catch (err) {
        console.error("Error while adding one wishlist");
        next(err);
    }
}

const updateWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const wishlist = await wishlistServices.getWishlist(req.params.id);

        if (!wishlist) {
            throw { message: "wishlist not found" };
        }

        const objectResponse = {
            isBought: req?.body?.isBought || wishlist.isBought
        };

        if (req?.body?.username) {
            const user = await userServices.getUserUsername(req.body.username);
            if (!user) {
                throw { message: "user not found" };
            }
            objectResponse.owner = {
                connect: {
                    id: user.id
                }
            }
        }
        const response = await wishlistServices.updateWishlist(req.params.id, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one wishlist");
        next(err);
    }
}

const deleteWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await wishlistServices.deleteWishlist(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting one wishlist");
        next(err);
    }
}

export default { getWishlists, getWishlist, addWishlsit, updateWishlist, deleteWishlist };