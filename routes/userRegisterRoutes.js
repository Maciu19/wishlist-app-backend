import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .post([
        check("username", "Invalid username, it must have at least 6 characters").isLength({ min: 6 }),
        check("password", "Invalid password, it must have at least 8 characters").isLength({ min: 8 }),
        check("email", "Invalid email").isEmail()
    ], validationMiddleware, requestMiddleware, userController.addUser)

export default router;