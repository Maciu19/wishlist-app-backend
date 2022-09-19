import userRegisterControllers from "./userRegisterControllers";

var userId;
var userDetailsId;
var userAddressId;

describe("userRegisterControllers", () => {
    it("should get all userRegister", async () => {
        const json = jest.fn();

        const user = await userRegisterControllers.userRegister(
            {
                body: {
                    username: "user 12",
                    email: "user2@gmail.com",
                    password: "123456789",
                    city: "Mangalia",
                    country: "Rom",
                    completeAddress: "Strada. Gheorghe",
                    firstName: "hELL",
                    lastName: "Other hell",
                    phone: "09323232321",
                    dob: "01-01-2000"
                }
            },
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
    })

    it("should give error all userRegister", async () => {
        const next = jest.fn();

        const user = await userRegisterControllers.userRegister(
            {},
            {},
            next
        );
        expect(next).toBeCalled();
    })
});