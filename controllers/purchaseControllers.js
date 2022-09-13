import purchaseServices from "../services/purchaseServices.js";
import userServices from "../services/userServices.js";
import itemWishlistServices from "../services/itemWishlistServices.js";

const getPurchases = async (req, res, next) => {
    try {
        res.json(await purchaseServices.getAll());
    } catch (err) {
        console.error("Error while getting all purchases");
        next(err);
    }
}

const getPurchasesUser = async (req, res, next) => {
    try {
        if (!req?.params?.userEmail) {
            throw { message: "No paramter provided" };
        }
        const response = await purchaseServices.getAllUser(req.params.userEmail);
        if (response.length === 0) {
            throw { message: "No purchases found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one purchase");
        next(err);
    }
}

const getPurchasesWishlist = async (req, res, next) => {
    try {
        if (!req?.params?.wishlistId) {
            throw { message: "No paramter provided" };
        }
        const response = await purchaseServices.getAllWishlist(req.params.wishlistId);
        if (response.length === 0) {
            throw { message: "No purchases found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one purchase");
        next(err);
    }
}

const getPurchase = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await purchaseServices.getPurchase(req.params.id);
        if (!response) {
            throw { message: "No purchase found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one purchase");
        next(err);
    }
}

const addPurchase = async (req, res, next) => {
    try {
        const user = await userServices.getUserEmail(req.body.userEmail);
        if (!user) {
            throw { message: "No user found" };
        }

        const itemWishlist = await itemWishlistServices.getItemsInWishlist(req.body.itemWishlistId);
        if (!itemWishlist) {
            throw { message: "No itemWishlist found" };
        }

        const response = await purchaseServices.addPurchase({
            itemWishlist: {
                connect: {
                    id: itemWishlist.id
                }
            },
            user: {
                connect: {
                    id: user.id
                }
            }
        })

        res.json(response);
    } catch (err) {
        console.error("Error while adding one purchase");
        next(err);
    }
};

const updatePurchase = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const purchase = await purchaseServices.getPurchase(req.params.id);

        if (!purchase) {
            throw { message: "Purchase not found" };
        }

        const objectResponse = {};

        if (req?.body?.userEmail) {
            const newUser = await userServices.getUserEmail(req.body.userEmail);
            if (!newUser) {
                throw { message: "No user found" };
            }

            objectResponse.user = {
                connect: {
                    id: newUser.id
                }
            }
        }

        if (req?.body?.itemWishlistId) {
            const newItemWishlist = await itemWishlistServices.getItemsInWishlist(req.body.itemWishlistId);
            if (!newItemWishlist) {
                throw { message: "No itemWishlist found" };
            }

            objectResponse.itemWishlist = {
                connect: {
                    id: newItemWishlist.id
                }
            }
        }
        const response = await purchaseServices.updatePurchase(req.params.id, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one purchase");
        next(err);
    }
};


const deletePurchase = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await purchaseServices.deletePurchase(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting one purchase");
        next(err);
    }
}

export default { getPurchase, getPurchases, getPurchasesUser, getPurchasesWishlist, addPurchase, updatePurchase, deletePurchase };