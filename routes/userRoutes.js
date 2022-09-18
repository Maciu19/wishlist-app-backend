import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/all")
    .get(requestMiddleware, authMiddleware, userController.getUsers)

router.route("/notifications")
    .get(requestMiddleware, authMiddleware, userController.getUserNotifications)

router.route("/wishlists")
    .get(requestMiddleware, authMiddleware, userController.getUserWishlists)

router.route("/items/wishlists")
    .get(requestMiddleware, authMiddleware, userController.getAllItems)

router.route("/groups/owner")
    .get(requestMiddleware, authMiddleware, userController.getUserGroupsOwner)

router.route("/groups/member")
    .get(requestMiddleware, authMiddleware, userController.getUserGroupsMember)

router.route("/")
    .get(requestMiddleware, authMiddleware, userController.getUser)
    .patch(requestMiddleware, authMiddleware, userController.updateUser)
    .delete(requestMiddleware, authMiddleware, userController.deleteUser)

export default router;