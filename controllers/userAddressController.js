import userAddressServices from "../services/userAddressServices.js";

const getAddresses = async (req, res, next) => {
    try {
        res.json(await userAddressServices.getAll());
    } catch (err) {
        console.error("Error while getting all addresses");
        next(err);
    }
}

const getAddress = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No paramter provided" };
        }

        const response = await userAddressServices.getAddress(req.params.id);

        if (!response) {
            throw { message: "No address found" };
        }

        res.json(response);
    } catch (err) {
        console.error("Error while getting one address");
        next(err);
    }
}

const addAddress = async (req, res, next) => {
    try {
        const response = await userAddressServices.addAddress({
            city: req.body.city,
            country: req.body.country,
            completeAddress: req.body.completeAddress
        })

        res.json(response);
    } catch (err) {
        console.error("Error while creating an address");
        next(err);
    }
}

const updateAddress = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No parameter provided" };
        }

        const id = req.params.id;
        const address = await userAddressServices.getAddress(id);

        const response = await userAddressServices.updateAddress(id, {
            city: req.body.city || address.city,
            country: req.body.country || address.country,
            completeAddress: req.body.completeAddress || address.completeAddress
        })

        res.json(response);
    } catch (err) {
        console.error("Error while updating an address");
        next(err);
    }
}

const deleteAddress = async (req, res, next) => {
    try {
        if (!req?.params?.id) {
            throw { message: "No parameter provided" };
        }

        const response = await userAddressServices.deleteAddress(req.params.id);

        res.json({ message: response });
    } catch (err) {
        console.error("Error while deleting an address");
        next(err);
    }
}

export default { getAddresses, getAddress, addAddress, updateAddress, deleteAddress };