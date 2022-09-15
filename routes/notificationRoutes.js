import express from "express";
import notificationController from "../controllers/notificationControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js"
import validationMiddleware from "../middleware/validationMiddleware.js"
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, notificationController.getNotifications)
    .post([
        check("category", "Invalid Category").exists(),
        check("details", "Invalid Details").exists(),
        check("userId", "Invalid User").exists(),
    ], validationMiddleware, requestMiddleware, notificationController.addNotification)

router.route("/active")
    .get(requestMiddleware, notificationController.getNotificationsActive)

router.route("/:id")
    .get(requestMiddleware, notificationController.getNotification)
    .patch(requestMiddleware, notificationController.updateNotification)
    .delete(requestMiddleware, notificationController.deleteNotification)

export default router;