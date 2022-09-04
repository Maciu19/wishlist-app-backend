import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, userController.getUsers)

router.route("/:email")
    .get(requestMiddleware, authMiddleware, userController.getUser)
    .patch(requestMiddleware, authMiddleware, userController.updateUser)
    .put(requestMiddleware, authMiddleware, userController.updateUser2)
    .delete(requestMiddleware, authMiddleware, userController.deleteUser)

export default router;