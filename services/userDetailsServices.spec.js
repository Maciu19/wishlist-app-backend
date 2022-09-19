import userDetailsServices from "./userDetailsServices";

describe("userDetailsServices", () => {
    it("should get all userDetails ", async () => {
        const result = await userDetailsServices.getAllUserDetails();
        expect(Array.isArray(result)).toBe(true);
    })
})