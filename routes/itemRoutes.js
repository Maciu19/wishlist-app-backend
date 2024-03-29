import express from "express";
import itemController from "../controllers/itemControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js"
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, itemController.getItems)
    .post([
        check("name", "Invalid name").exists(),
        check("details", "Invalid details").exists(),
        check("quantity", "Invalid quantity").isInt(),
        check("link", "Invalid link").exists()
    ], validationMiddleware, requestMiddleware, itemController.addItem)

router.route("/:id")
    .get(requestMiddleware, itemController.getItem)
    .patch(requestMiddleware, itemController.updateItem)
    .delete(requestMiddleware, itemController.deleteItem)

export default router;