import itemServices from "../services/itemServices.js";

const getItems = async (req, res, next) => {
    try {
        res.json(await itemServices.getAll());
    } catch (err) {
        console.error("Error while getting all items");
        next(err);
    }
}

const getItem = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await itemServices.getItem(req.params.id);
        if (!response) {
            throw { message: "No user found" };
        }
        res.json(response);
    } catch (err) {
        console.error("Error while getting one item");
        next(err);
    }
}

const addItem = async (req, res, next) => {
    try {
        const response = await itemServices.addItem({
            name: req.body.name,
            details: req.body.details,
            link: req.body.link,
            size: req?.body?.size || "",
        });

        res.json(response);
    } catch (err) {
        console.error("Error while adding an item");
        next(err);
    }
};

const updateItem = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No parameter provided" };
        }

        const id = req.params.id;
        const item = await itemServices.getItem(id);

        if (!item) {
            throw { message: "Item not found" };
        }

        const response = await itemServices.updateItem(id, {
            name: req?.body?.name || item.name,
            details: req?.body?.details || item.details,
            link: req?.body?.link || item.link,
            size: req?.body?.size || item.size,
        });

        res.json(response);
    } catch (err) {
        console.error(`Error while updating an item`);
        next(err);
    }
};

const updateItem2 = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No parameter provided" };
        }

        const id = req.params.id;
        const item = await itemServices.getItem(id);

        if (!item) {
            throw { message: "Item not found" };
        }

        const response = await itemServices.updateItem(id, {
            name: req?.body?.name,
            details: req?.body?.details,
            link: req?.body?.link,
            size: req?.body?.size,
        });

        res.json(response);
    } catch (err) {
        console.error(`Error while updating 2 an item`);
        next(err);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }
        const response = await itemServices.deleteItem(req.params.id);
        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting an item");
        next(err);
    }
}

export default { getItems, getItem, addItem, updateItem, updateItem2, deleteItem };