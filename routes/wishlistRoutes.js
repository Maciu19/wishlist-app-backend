import express from "express"
import wishlistControllers from "../controllers/wishlistControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, wishlistControllers.getWishlists)
    .post([
        check("name", "invalid name").exists()
    ], validationMiddleware, requestMiddleware, authMiddleware, wishlistControllers.addWishlsit)

router.route("/name/:name")
    .get(requestMiddleware, wishlistControllers.getWishlistName)

router.route("/:id/all/users")
    .get(requestMiddleware, wishlistControllers.getWishlistAllUsers)

router.route("/:id")
    .get(requestMiddleware, wishlistControllers.getWishlist)
    .patch(requestMiddleware, wishlistControllers.updateWishlist)
    .delete(requestMiddleware, wishlistControllers.deleteWishlist)


export default router;