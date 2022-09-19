import itemServices from "./itemServices";

var itemId;
var itemName = "Item 1";
var itemDetails = "A lot of details";
var itemLink = "https://www.google.ro";
var itemQuantity = 2;

describe("itemServices", () => {
    it("should get all items ", async () => {
        const result = await itemServices.getAll();
        expect(Array.isArray(result)).toBe(true);
    })

    it("should create a item", async () => {
        const result = await itemServices.addItem({
            name: itemName,
            details: itemDetails,
            link: itemLink,
            quantity: itemQuantity
        });

        itemId = result.id;

        expect(result).toMatchObject({
            id: itemId,
            name: itemName,
            details: itemDetails,
            link: itemLink,
            quantity: itemQuantity,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get a item by id ", async () => {
        const result = await itemServices.getItem(itemId);

        expect(result).toMatchObject({
            id: itemId,
            name: itemName,
            details: itemDetails,
            link: itemLink,
            quantity: itemQuantity,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should update a item by id ", async () => {
        itemQuantity++;
        const result = await itemServices.updateItem(itemId, {
            quantity: itemQuantity
        });

        expect(result).toMatchObject({
            id: itemId,
            name: itemName,
            details: itemDetails,
            link: itemLink,
            quantity: itemQuantity,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should delete a item by id ", async () => {
        const result = await itemServices.deleteItem(itemId);

        expect(result).toMatchObject({
            id: itemId,
            name: itemName,
            details: itemDetails,
            link: itemLink,
            quantity: itemQuantity,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });
});
