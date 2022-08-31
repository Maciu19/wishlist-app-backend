import express from "express";
import userDetailsControllers from "../controllers/userDetailsControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, userDetailsControllers.getAllUserDetails)
    .post([
        check("firstName", "firstName invalid").isLength({ min: 4 }),
        check("lastName", "lastName invalid").isLength({ min: 4 }),
        check("phone", "phone invalid").isLength({ min: 9 }),
        check("dob", "Date Of Birth invalid").exists(),
        check("email", "Invalid email").isEmail(),
        check("addressId", "userAddressId invalid").exists()
    ], validationMiddleware, requestMiddleware, userDetailsControllers.addUserDetails)

router.route("/:id")
    .get(requestMiddleware, userDetailsControllers.getUserDetails)
    .patch(requestMiddleware, userDetailsControllers.updateUserDetails)
    .delete(requestMiddleware, userDetailsControllers.deleteUserDetails)

export default router;