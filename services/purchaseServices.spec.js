import purchaseServices from "./purchaseServices";

describe("purchaseServices", () => {
    it("should get all purchases ", async () => {
        const result = await purchaseServices.getAll();
        expect(Array.isArray(result)).toBe(true);
    })
})