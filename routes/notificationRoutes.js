import express from "express";
import notificationController from "../controllers/notificationControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js"

const router = express.Router();

router.route("/")
    .get(requestMiddleware, notificationController.getNotifications)

router.route("/:id")
    .get(requestMiddleware, notificationController.getNotification)
    .delete(requestMiddleware, notificationController.deleteNotification)

export default router;