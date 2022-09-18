import express from "express";
import userGroupsControllers from "../controllers/userGroupsControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, userGroupsControllers.getUsersInGroups)
    .post([
        check("username", "Invalid user").exists(),
        check("groupId", "Invalid group").exists()
    ], validationMiddleware, requestMiddleware, userGroupsControllers.addUserInGroup)

router.route("/create/owner")
    .post([
        check("name", "Invalid name for group").exists(),
    ], validationMiddleware, requestMiddleware, authMiddleware, userGroupsControllers.addUserInGroupOwner)

router.route("/:groupId/owner")
    .get(requestMiddleware, userGroupsControllers.getOwnerInGroup)

router.route("/:id")
    .get(requestMiddleware, userGroupsControllers.getUserInGroup)
    .patch(requestMiddleware, userGroupsControllers.updateUserInGroup)
    .delete(requestMiddleware, userGroupsControllers.deleteUserInGroup)



export default router;