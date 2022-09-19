import groupServices from "./groupServices";

var groupId;
var groupName = "Test1";

describe("groupServices", () => {
    it("should get all groups ", async () => {
        const result = await groupServices.getAll();
        expect(Array.isArray(result)).toBe(true);
    })

    it("should create a group", async () => {
        const result = await groupServices.addGroup({
            name: groupName
        });

        groupId = result.id;

        expect(result).toMatchObject({
            id: groupId,
            name: groupName,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get a group by id ", async () => {
        const result = await groupServices.getGroup(groupId);

        expect(result).toMatchObject({
            id: groupId,
            name: groupName,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should update a group by id ", async () => {
        groupName += "!";
        const result = await groupServices.updateGroup(groupId, {
            name: groupName
        });

        expect(result).toMatchObject({
            id: groupId,
            name: groupName,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should delete a group by id ", async () => {
        const result = await groupServices.deleteGroup(groupId);

        expect(result).toMatchObject({
            id: groupId,
            name: groupName,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });
});
