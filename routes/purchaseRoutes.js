import express from "express";
import purchaseControllers from "../controllers/purchaseControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, purchaseControllers.getPurchases)
    .post([
        check("userEmail", "User invalid").isEmail(),
        check("itemWishlistId", "itemWishlist invalid").exists()
    ], validationMiddleware, requestMiddleware, purchaseControllers.addPurchase)

router.route("/wishlist/:wishlistId")
    .get([
        check("wishlistId", "Wishlist invalid").exists()
    ], validationMiddleware, requestMiddleware, purchaseControllers.getPurchasesWishlist)

router.route("/user/:userEmail")
    .get([
        check("userEmail", "Wishlist invalid").isEmail()
    ], validationMiddleware, requestMiddleware, purchaseControllers.getPurchasesUser)

router.route("/:id")
    .get(requestMiddleware, purchaseControllers.getPurchase)
    .patch(requestMiddleware, purchaseControllers.updatePurchase)
    .delete(requestMiddleware, purchaseControllers.deletePurchase)



export default router;