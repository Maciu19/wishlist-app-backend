import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/all")
    .get(requestMiddleware, authMiddleware, userController.getUsers)

router.route("/items/wishlists")
    .get(requestMiddleware, authMiddleware, userController.getAllItems)

router.route("/")
    .get(requestMiddleware, authMiddleware, userController.getUser)
    .patch(requestMiddleware, authMiddleware, userController.updateUser)
    .delete(requestMiddleware, authMiddleware, userController.deleteUser)

export default router;