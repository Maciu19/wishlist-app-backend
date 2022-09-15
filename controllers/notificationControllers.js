import notificationServices from "../services/notificationServices.js";
import userServices from "../services/userServices.js";

const getNotifications = async (req, res, next) => {
    try {
        res.json(await notificationServices.getAll());
    } catch (err) {
        console.error("Error while getting all notifications");
        next(err);
    }
}

const getNotificationsActive = async (req, res, next) => {
    try {
        res.json(await notificationServices.getNotificationsActive());
    } catch (err) {
        console.error("Error while getting all notifications which are active");
        next(err);
    }
}

const getNotification = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await notificationServices.getNotification(req.params.id);
        if (!response) {
            throw { message: "No notification found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one notification");
        next(err);
    }
}

const addNotification = async (req, res, next) => {
    try {
        const user = await userServices.getUserId(req.body.userId);
        if (!user) {
            throw { message: "No user found" }
        }

        const cateogry = req.body.category;
        if (!(cateogry === "EVENT" || cateogry === "GIFT" || cateogry === "GROUP")) {
            throw { message: "Invalid type of category" }
        }

        const response = await notificationServices.addNotification({
            category: req.body.category,
            details: req.body.details,
            user: {
                connect: {
                    id: user.id
                }
            }
        })

        res.json(response);
    } catch (err) {
        console.error("Error while adding one notification");
        next(err);
    }
}


const updateNotification = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const notification = await notificationServices.getNotification(req.params.id);
        if (!notification) {
            throw { message: "No notification found" };
        }

        const objectResponse = {};

        if (req?.body?.isActive === true || req?.body?.isActive === false) {
            objectResponse.isActive = req.body.isActive
        }

        const response = await notificationServices.updateNotification(req.params.id, objectResponse);
        res.json(response);
    } catch (err) {
        console.error("Error while updating one notification");
        next(err);
    }
}

const deleteNotification = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await notificationServices.deleteNotification(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting an notification");
        next(err);
    }
}

export default { getNotifications, getNotificationsActive, getNotification, addNotification, updateNotification, deleteNotification };