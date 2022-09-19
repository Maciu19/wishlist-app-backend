import userAddressServices from "./userAddressServices";

describe("userAddressServices", () => {
    it("should get all userAddresses", async () => {
        const result = await userAddressServices.getAll();
        expect(Array.isArray(result)).toBe(true);
    })
})