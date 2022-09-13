import itemWishlistServices from "../services/itemWishlistServices.js";
import wishlistServices from "../services/wishlistServices.js";
import itemServices from "../services/itemServices.js";
import userServices from "../services/userServices.js";
import purchaseServices from "../services/purchaseServices.js";

const getItemsInWishlists = async (req, res, next) => {
    try {
        res.json(await itemWishlistServices.getAll());
    } catch (err) {
        console.error("Error while getting all wishlists");
        next(err);
    }
}

const getItemsInWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await itemWishlistServices.getItemsInWishlist(req.params.id);

        if (!response) {
            throw { message: "No paramter provided" };
        }

        res.json(response);
    } catch (err) {
        console.error("Error while getting one wishlist");
        next(err);
    }
}

const addItemsInWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistServices.getWishlistById(req.body.wishlistId);
        if (!wishlist) {
            throw { message: "No wishlist found" };
        }

        const item = await itemServices.getItem(req.body.itemId);
        if (!item) {
            throw { message: "No item found" };
        }

        const response = await itemWishlistServices.addItemsInWishlist({
            wishlist: {
                connect: {
                    id: wishlist.id
                }
            },
            item: {
                connect: {
                    id: item.id
                }
            }
        });

        res.json(response);
    } catch (err) {
        console.error("Error while adding one wishlist");
        next(err);
    }
}

const updateItemsInWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const itemsInWishlist = await itemWishlistServices.getItemsInWishlist(req.params.id);

        if (!itemsInWishlist) {
            throw { message: "ItemWishlist not found" };
        }

        const objectResponse = {};
        if (req?.body?.isBought === true || req?.body?.isBought === false) {
            objectResponse.isBought = req.body.isBought;
            if (req?.body?.isBought === true) {
                if (!req?.body?.buyers) {
                    throw { message: "Buyers invalid" };
                }

                if (!Array.isArray(req.body.buyers)) {
                    throw { message: "Buyers should be an array" }
                }

                const buyers = req.body.buyers;
                if (buyers.length === 0) {
                    throw { message: "Buyers invalid" };
                }

                for (let buyer of buyers) {
                    if (!typeof buyer === "string") {
                        throw { message: "Buyers should be strings" }
                    }

                    let user = await userServices.getUserEmail(buyer);
                    if (!user) {
                        throw { message: "Invalid Buyer" };
                    }

                    await purchaseServices.addPurchase({
                        itemWishlist: {
                            connect: {
                                id: itemsInWishlist.id
                            }
                        },
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    })
                }

            }
        }

        if (req?.body?.wishlistId) {
            const newWishlist = await wishlistServices.getWishlistByName(req.body.wishlistId);
            if (!newWishlist) {
                throw { message: "No wishlist found" };
            }

            objectResponse.wishlist = {
                connect: {
                    id: newWishlist.id
                }
            }
        }

        if (req?.body?.itemId) {
            const newItem = await itemServices.getItem(req.body.itemId);
            if (!newItem) {
                throw { message: "No item found" };
            }
            objectResponse.item = {
                connect: {
                    id: newItem.id
                }
            }
        }
        const response = await itemWishlistServices.updateItemsInWishlist(req.params.id, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one wishlist");
        next(err);
    }
}

const deleteItemsInWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await itemWishlistServices.deleteItemsInWishlist(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting one wishlist");
        next(err);
    }
}

export default { getItemsInWishlists, getItemsInWishlist, addItemsInWishlist, updateItemsInWishlist, deleteItemsInWishlist };