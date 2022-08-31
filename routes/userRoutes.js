import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, userController.getUsers)
    .post([
        check("username", "Invalid username, it must have at least 6 characters").isLength({ min: 6 }),
        check("password", "Invalid password, it must have at least 8 characters").isLength({ min: 8 }),
        check("email", "Invalid email").isEmail()
    ], validationMiddleware, requestMiddleware, userController.addUser)

router.route("/login")
    .get([
        check("email", "Invalid email").isEmail(),
        check("password", "Invalid password, it must have at least 8 characters").isLength({ min: 8 })
    ], validationMiddleware, requestMiddleware, userController.loginUser)

router.route("/:email")
    .get(requestMiddleware, authMiddleware, userController.getUser)
    .patch(requestMiddleware, authMiddleware, userController.updateUser)
    .put(requestMiddleware, authMiddleware, userController.updateUser2)
    .delete(requestMiddleware, authMiddleware, userController.deleteUser)

export default router;