import userServices from "./userServices.js";

var userUsername = "User 1";
var userEmail = "user1@gmail.com";
var userId;

describe("userServices", () => {

    it("should get all users ", async () => {
        const result = await userServices.getAll();
        expect(Array.isArray(result)).toBe(true);
    })

    it("should create a user", async () => {
        const result = await userServices.addUser({
            username: userUsername,
            email: userEmail,
            password: "123456789"
        });

        userId = result.id;

        expect(result).toMatchObject({
            id: userId,
            username: userUsername,
            password: expect.any(String),
            email: userEmail,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get a user by id ", async () => {
        const result = await userServices.getUserId(userId);

        expect(result).toMatchObject({
            id: userId,
            username: userUsername,
            password: expect.any(String),
            email: userEmail,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get a user by email ", async () => {
        const result = await userServices.getUserEmail(userEmail);

        expect(result).toMatchObject({
            id: userId,
            username: userUsername,
            password: expect.any(String),
            email: userEmail,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get a user by username ", async () => {
        const result = await userServices.getUserUsername(userUsername);

        expect(result).toMatchObject({
            id: userId,
            username: userUsername,
            password: expect.any(String),
            email: userEmail,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get update a user by email", async () => {
        userUsername += "!"
        const result = await userServices.updateUser(userEmail, {
            username: userUsername
        });

        expect(result).toMatchObject({
            id: userId,
            username: userUsername,
            password: expect.any(String),
            email: userEmail,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should get delete a user by id", async () => {
        const result = await userServices.deleteUser(userEmail);

        expect(result).toMatchObject({
            id: userId,
            username: userUsername,
            password: expect.any(String),
            email: userEmail,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });
})