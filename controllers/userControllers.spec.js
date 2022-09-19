import userController from "./userControllers"

describe("userController", () => {
    //! get all items
    it("should get all user", async () => {
        const json = jest.fn();

        await userController.getUsers(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all users", async () => {
        const next = jest.fn();

        await userController.getUsers(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});