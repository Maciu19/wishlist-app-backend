import userGroupsServices from "./userGroupsServices";

describe("userGroupsServices", () => {
    it("should get all userDetails ", async () => {
        const result = await userGroupsServices.getAll();
        expect(Array.isArray(result)).toBe(true);
    })
})