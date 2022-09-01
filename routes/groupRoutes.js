import express from "express"
import groupControllers from "../controllers/groupControllers.js"
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js"
import { check } from "express-validator";


const router = express.Router();

router.route("/")
    .get(requestMiddleware, groupControllers.getGroups)
    .post([
        check("name", "Invalid name").exists()
    ], validationMiddleware, requestMiddleware, groupControllers.addGroup)

router.route("/:id")
    .get(requestMiddleware, groupControllers.getGroup)
    .patch(requestMiddleware, groupControllers.updateGroup)
    .delete(requestMiddleware, groupControllers.deleteGroup)

export default router;