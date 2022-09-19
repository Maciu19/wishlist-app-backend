import notificationService from "./notificationServices";

describe("notificationServices", () => {
    it("should get all notifications", async () => {
        const result = await notificationService.getAll();
        expect(Array.isArray(result)).toBe(true);
    })
})