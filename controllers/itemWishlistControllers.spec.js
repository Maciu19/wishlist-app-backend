import itemWishlistController from "./itemWishlistControllers";

describe("itemWishlistController", () => {
    it("should get all itemWishlist ", async () => {
        const json = jest.fn();

        await itemWishlistController.getItemsInWishlists(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all itemWishlist", async () => {
        const next = jest.fn();

        await itemWishlistController.getItemsInWishlists(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});