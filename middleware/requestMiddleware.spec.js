import requestMiddleware from "./requestMiddleware"

describe("requestMiddleware", () => {
    it("requestMiddleware", async () => {
        const next = jest.fn();

        requestMiddleware(
            {
                method: "GET"
            },
            {},
            next
        );

        expect(next).toBeCalled();
    });
});