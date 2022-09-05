import express from "express";
import groupWishlistController from "../controllers/groupWishlistControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, groupWishlistController.getGroupsWishlists)
    .post([
        check("wishlistName", "Wishlist invalid").exists(),
        check("groupName", "Group invalid").exists()
    ], validationMiddleware, requestMiddleware, groupWishlistController.addGroupWishlist)

router.route("/:id")
    .get(requestMiddleware, groupWishlistController.getGroupWishlist)
    .patch(requestMiddleware, groupWishlistController.updateGroupWishlist)
    .delete(requestMiddleware, groupWishlistController.deleteGroupWishlist)

export default router;