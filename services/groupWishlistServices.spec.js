import groupWishlistService from "./groupWishlistServices";

describe("groupWishlistService", () => {
    it("should get all groupsWishlists ", async () => {
        const result = await groupWishlistService.getAll();
        expect(Array.isArray(result)).toBe(true);
    })
})