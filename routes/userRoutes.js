import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requestMiddleware, authMiddleware, userController.getUsers);
router.get("/login", requestMiddleware, userController.loginUser);
router.get("/:username", requestMiddleware, authMiddleware, userController.getUser);

router.post("/", requestMiddleware, userController.addUser);

router.patch("/:username", requestMiddleware, authMiddleware, userController.updateUser);

router.put("/:username", requestMiddleware, authMiddleware, userController.updateUser2);

router.delete("/:username", requestMiddleware, authMiddleware, userController.deleteUser);

export default router;