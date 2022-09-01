import express from "express"
import wishlistControllers from "../controllers/wishlistControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, wishlistControllers.getWishlists)
    .post([
        check("name", "invalid name").exists(),
        check("email", "Invalid email").isEmail()
    ], validationMiddleware, requestMiddleware, wishlistControllers.addWishlsit)

router.route("/:name")
    .get(requestMiddleware, wishlistControllers.getWishlist)
    .patch(requestMiddleware, wishlistControllers.updateWishlist)
    .delete(requestMiddleware, wishlistControllers.deleteWishlist)

export default router;