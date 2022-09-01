import express from "express";
import itemWishlistController from "../controllers/itemWishlistControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, itemWishlistController.getItemsInWishlists)
    .post([
        check("wishlistName", "wishlist invalid").exists(),
        check("itemId", "item invalid").exists()
    ], validationMiddleware, requestMiddleware, itemWishlistController.addItemsInWishlist)

router.route("/:id")
    .get(requestMiddleware, itemWishlistController.getItemsInWishlist)
    .patch(requestMiddleware, itemWishlistController.updateItemsInWishlist)
    .delete(requestMiddleware, itemWishlistController.deleteItemsInWishlist)

export default router;

