import groupControllers from "./groupControllers";

var groupId;

describe("groupControllers", () => {
    //! get all groups
    it("should get all groups ", async () => {
        const json = jest.fn();

        await groupControllers.getGroups(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all groups", async () => {
        const next = jest.fn();

        await groupControllers.getGroups(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! add one group
    it("should add one group ", async () => {
        const json = jest.fn();

        const group = await groupControllers.addGroup(
            {
                body: {
                    name: "Grup 10"
                }
            },
            {
                json
            },
            {}
        );

        groupId = json.mock.calls[0][0].id;

        expect(json).toBeCalled();
    });

    it("should throw an error adding one group", async () => {
        const next = jest.fn();

        await groupControllers.addGroup(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! get one group
    it("should get one group ", async () => {
        const json = jest.fn();

        const group = await groupControllers.getGroup(
            {
                params: {
                    id: groupId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error get one group", async () => {
        const next = jest.fn();

        await groupControllers.getGroup(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! update one group
    it("should update one group ", async () => {
        const json = jest.fn();

        const group = await groupControllers.updateGroup(
            {
                params: {
                    id: groupId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error get one group", async () => {
        const next = jest.fn();

        await groupControllers.updateGroup(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! delete one group
    it("should delete one group ", async () => {
        const json = jest.fn();

        const group = await groupControllers.deleteGroup(
            {
                params: {
                    id: groupId
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    });

    it("should throw an error delete one group", async () => {
        const next = jest.fn();

        await groupControllers.deleteGroup(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });
});