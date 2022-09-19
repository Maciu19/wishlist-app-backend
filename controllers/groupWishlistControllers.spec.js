import groupWishlistControllers from "./groupWishlistControllers";

describe("groupWishlistControllers", () => {
    it("should get all groupsWishlist ", async () => {
        const json = jest.fn();

        await groupWishlistControllers.getGroupsWishlists(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all groupsWishlist", async () => {
        const next = jest.fn();

        await groupWishlistControllers.getGroupsWishlists(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});