import deleteUserController from "./deleteUserController";

describe("deleteUserController", () => {
    it("should get deleteUser ", async () => {
        const json = jest.fn();

        const user = await deleteUserController.deleteUser(
            {
                user: {
                    user: {
                        email: "user2@gmail.com"
                    }
                }
            },
            {
                json
            },
            {}
        );
        expect(json).toBeCalled();
    })

    it("should give error deleteUserController", async () => {
        const next = jest.fn();

        const user = await deleteUserController.deleteUser(
            {},
            {},
            next
        );
        expect(next).toBeCalled();
    })
});