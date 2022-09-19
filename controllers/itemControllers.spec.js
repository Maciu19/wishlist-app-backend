import itemControllers from "./itemControllers";

var itemId;

describe("itemControllers", () => {
    //! get all items
    it("should get all item ", async () => {
        const json = jest.fn();

        await itemControllers.getItems(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all items", async () => {
        const next = jest.fn();

        await itemControllers.getItems(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! add one item
    it("should add one item ", async () => {
        const json = jest.fn();

        const item = await itemControllers.addItem(
            {
                body: {
                    name: "item 1",
                    details: "detalii item 1",
                    link: "link 1",
                    quantity: 2,
                }
            },
            {
                json
            },
            {}
        );

        itemId = json.mock.calls[0][0].id;

        expect(json).toBeCalled();
    });

    it("should throw an error adding one item", async () => {
        const next = jest.fn();

        await itemControllers.addItem(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });



    //! get one item
    it("should get one item ", async () => {
        const json = jest.fn();

        const item = await itemControllers.getItem(
            {
                params: {
                    id: itemId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error get one item", async () => {
        const next = jest.fn();

        await itemControllers.getItem(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! update one item
    it("should update one group ", async () => {
        const json = jest.fn();

        const item = await itemControllers.updateItem(
            {
                params:
                {
                    id: itemId
                },

                body: {
                    name: "item 1!"
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error updating one item", async () => {
        const next = jest.fn();

        await itemControllers.updateItem(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! delete one item
    it("should delete one item ", async () => {
        const json = jest.fn();

        const item = await itemControllers.deleteItem(
            {
                params: {
                    id: itemId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error delete one item", async () => {
        const next = jest.fn();

        await itemControllers.deleteItem(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});