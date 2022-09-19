import notificationController from "./notificationControllers";

describe("notificationController", () => {
    it("should get all notification ", async () => {
        const json = jest.fn();

        await notificationController.getNotifications(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all notification", async () => {
        const next = jest.fn();

        await notificationController.getNotifications(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});