import express, { request } from "express";
import itemController from "../controllers/itemControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js"

const router = express.Router();

router.get("/", requestMiddleware, itemController.getItems);
router.get("/:id", requestMiddleware, itemController.getItem);

router.post("/", requestMiddleware, itemController.addItem);

router.patch("/:id", requestMiddleware, itemController.updateItem);
router.put("/:id", requestMiddleware, itemController.updateItem2);

router.delete("/:id", requestMiddleware, itemController.deleteItem);

export default router;