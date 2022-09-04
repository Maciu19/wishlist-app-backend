import express from "express";
import userController from "../controllers/userControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .post([
        check("email", "Invalid email").isEmail(),
        check("password", "Invalid password, it must have at least 8 characters").isLength({ min: 8 })
    ], validationMiddleware, requestMiddleware, userController.loginUser)

export default router;