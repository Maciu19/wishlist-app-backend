import userDetailsController from "./userDetailsControllers";

describe("userDetailsController", () => {
    //! get all addresses
    it("should get all users details ", async () => {
        const json = jest.fn();

        await userDetailsController.getAllUserDetails(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all users details", async () => {
        const next = jest.fn();

        await userDetailsController.getAllUserDetails(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});