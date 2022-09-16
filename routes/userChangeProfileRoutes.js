import express from "express";
import userChangeProfile from "../controllers/userChangeProfileController.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .patch(requestMiddleware, authMiddleware, userChangeProfile.changeProfileDetails)

export default router;