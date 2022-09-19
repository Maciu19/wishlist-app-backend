import purchaseController from "./purchaseControllers";

describe("purchaseController", () => {
    it("should get all purchase ", async () => {
        const json = jest.fn();

        await purchaseController.getPurchases(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all notification", async () => {
        const next = jest.fn();

        await purchaseController.getPurchases(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});