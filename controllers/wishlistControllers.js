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
        if (!req?.params?.name) {
            throw { message: "No paramter provided" };
        }
        const response = await wishlistServices.getWishlistByName(req.params.name);

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
        // username -> ownerUsername
        const user = await userServices.getUserEmail(req.body.email);
        if (!user) {
            throw { message: "No user found" };
        }

        const response = await wishlistServices.addWishlist({
            name: req.body.name,
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
        if (!req?.params?.name) {
            throw { message: "No paramter provided" };
        }

        const wishlist = await wishlistServices.getWishlistByName(req.params.name);

        if (!wishlist) {
            throw { message: "wishlist not found" };
        }

        const objectResponse = {
            name: req?.body?.name || wishlist.name
        };

        if (req?.body?.isBought === true || req?.body?.isBought === false) {
            objectResponse.isBought = req.body.isBought;
        }

        if (req?.body?.email) {
            const user = await userServices.getUserEmail(req.body.email);
            if (!user) {
                throw { message: "user not found" };
            }
            objectResponse.owner = {
                connect: {
                    id: user.id
                }
            }
        }
        const response = await wishlistServices.updateWishlist(req.params.name, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one wishlist");
        next(err);
    }
}

const deleteWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.name) {
            throw { message: "No paramter provided" };
        }
        const response = await wishlistServices.deleteWishlist(req.params.name);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting one wishlist");
        next(err);
    }
}

export default { getWishlists, getWishlist, addWishlsit, updateWishlist, deleteWishlist };