import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(requestMiddleware, authMiddleware, userController.logoutUser)

export default router;