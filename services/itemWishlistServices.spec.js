import itemWishlistService from "./itemWishlistServices";

describe("itemWishlistService", () => {
    it("should get all itemWishlist", async () => {
        const result = await itemWishlistService.getAll();
        expect(Array.isArray(result)).toBe(true);
    })
})