import userAddressController from "./userAddressController";

var userAddressId;

describe("userAddressController", () => {
    //! get all addresses
    it("should get all addresses ", async () => {
        const json = jest.fn();

        await userAddressController.getAddresses(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all addresses", async () => {
        const next = jest.fn();

        await userAddressController.getAddresses(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! add one address
    it("should add one address ", async () => {
        const json = jest.fn();

        const address = await userAddressController.addAddress(
            {
                body: {
                    city: "City 1",
                    country: "Country 1",
                    completeAddress: "completeAddress 1",
                }
            },
            {
                json
            },
            {}
        );

        userAddressId = json.mock.calls[0][0].id;

        expect(json).toBeCalled();
    });

    it("should throw an error adding one address", async () => {
        const next = jest.fn();

        await userAddressController.addAddress(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });



    //! get one address
    it("should get one address ", async () => {
        const json = jest.fn();

        const address = await userAddressController.getAddress(
            {
                params: {
                    id: userAddressId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error get one address", async () => {
        const next = jest.fn();

        await userAddressController.getAddress(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! update one address
    it("should update one address ", async () => {
        const json = jest.fn();

        const address = await userAddressController.updateAddress(
            {
                params: {
                    id: userAddressId
                },
                body: {
                    city: "City 1!"
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error updating one address", async () => {
        const next = jest.fn();

        await userAddressController.updateAddress(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! delete one address
    it("should delete one address ", async () => {
        const json = jest.fn();

        const address = await userAddressController.deleteAddress(
            {
                params: {
                    id: userAddressId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error delete one address", async () => {
        const next = jest.fn();

        await userAddressController.deleteAddress(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});