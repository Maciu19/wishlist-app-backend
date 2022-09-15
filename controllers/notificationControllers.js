import notificationServices from "../services/notificationServices.js";

const getNotifications = async (req, res, next) => {
    try {
        res.json(await notificationServices.getAll());
    } catch (err) {
        console.error("Error while getting all notifications");
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
            throw { message: "No user found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one notification");
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

export default { getNotifications, getNotification, deleteNotification };