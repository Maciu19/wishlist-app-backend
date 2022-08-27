import express from "express";
import userAddressController from "../controllers/userAddressController.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, userAddressController.getAddresses)
    .post([
        check("city", "Invalid City").exists(),
        check("country", "Invalid Country").exists(),
        check("detaliedAddress", "Invalid Address").isLength({ min: 5 })
    ], validationMiddleware, requestMiddleware, userAddressController.addAddress)

router.route("/:id")
    .get(requestMiddleware, userAddressController.getAddress)
    .patch(requestMiddleware, userAddressController.updateAddress)
    .delete(requestMiddleware, userAddressController.deleteAddress)

export default router;