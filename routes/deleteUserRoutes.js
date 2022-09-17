import express from "express";
import deleteUserController from "../controllers/deleteUserController.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .delete(requestMiddleware, authMiddleware, deleteUserController.deleteUser)

export default router;