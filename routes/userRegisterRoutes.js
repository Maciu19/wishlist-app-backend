import express from "express";
import userRegisterController from "../controllers/userRegisterControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .post([
        check("city", "Invalid City").exists(),
        check("country", "Invalid Country").exists(),
        check("completeAddress", "Invalid Address").isLength({ min: 5 }),
        check("username", "Invalid username, it must have at least 6 characters").isLength({ min: 6 }),
        check("password", "Invalid password, it must have at least 8 characters").isLength({ min: 8 }),
        check("email", "Invalid email").isEmail(),
        check("firstName", "firstName invalid").isLength({ min: 4 }),
        check("lastName", "lastName invalid").isLength({ min: 4 }),
        check("phone", "phone invalid").isLength({ min: 9 }),
        check("dob", "Date Of Birth invalid").exists()
    ], validationMiddleware, requestMiddleware, userRegisterController.userRegister)

export default router;