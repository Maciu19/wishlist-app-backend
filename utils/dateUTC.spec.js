import dateUTC from "./dateUTC"

describe("dateUTC", () => {
    it("dateUTC", async () => {
        const date = new Date(2001, 9, 26, 10, 0, 0, 0);
        const res = dateUTC(date);

        const newDate = new Date(2001, 9, 26, 13, 0, 0, 0);
        expect(res).toEqual(newDate);
    });
});