import express from "express";
import userGroupsControllers from "../controllers/userGroupsControllers.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route("/")
    .get(requestMiddleware, userGroupsControllers.getUsersInGroups)
    .post([
        check("userEmail", "Invalid user email").isEmail(),
        check("groupName", "Invalid group").exists()
    ], validationMiddleware, requestMiddleware, userGroupsControllers.addUserInGroup)

router.route("/owner/:groupName")
    .get(requestMiddleware, userGroupsControllers.getOwnerInGroup)

router.route("/:id")
    .get(requestMiddleware, userGroupsControllers.getUserInGroup)
    .patch(requestMiddleware, userGroupsControllers.updateUserInGroup)
    .delete(requestMiddleware, userGroupsControllers.deleteUserInGroup)



export default router;