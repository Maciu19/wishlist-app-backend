import wishlistControllers from "./wishlistControllers";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

var idOwner;
var idWishlist;
var nameWishlist;

const createOwner = async () => {
    const owner = await prisma.user.create({
        data: {
            username: "Test12",
            email: "test12@gmail.com",
            password: "123456789"
        }
    })
    return owner;
}


const deleteOwner = async (id) => {
    await prisma.user.delete({
        where: {
            id
        }
    })
}


describe("wishlistControllers", () => {
    //!---------------- All Wishlists -----------------------
    it("should get all wishlist ", async () => {
        const json = jest.fn();

        await wishlistControllers.getWishlists(
            {},
            {
                json
            },
            {}
        );

        expect(json).toBeCalled();
        expect(Array.isArray(json.mock.calls[0][0])).toBe(true);
    });

    it("should throw an error for all wishlists", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlists(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! ----------------------- Add One Wishlist ------------
    it("should add one wishlist ", async () => {
        const json = jest.fn();
        const owner = await createOwner();
        idOwner = owner.id;

        await wishlistControllers.addWishlsit(
            {
                user: {
                    user: {
                        email: owner.email
                    }
                },
                body: {
                    name: "Nume"
                }
            },
            {
                json
            },
            {}
        );

        idWishlist = json.mock.calls[0][0].id;
        nameWishlist = json.mock.calls[0][0].name;

        expect(json).toBeCalled();
    });

    it("should throw an error for adding a wishlist", async () => {
        const next = jest.fn();

        await wishlistControllers.addWishlsit(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! ----------------------- Get One Wishlist by Id ------
    it("should get one wishlist by id", async () => {
        const json = jest.fn();
        await wishlistControllers.getWishlist(
            {
                params: {
                    id: idWishlist
                }
            },
            {
                json
            },
            {}
        );
        expect(json).toBeCalled();
    });

    it("should throw an error for getting a wishlist [without req]", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlist(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    it("should throw an error for getting a wishlist[invalid id]", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlist(
            {
                params: {
                    id: "123"
                }
            },
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! ----------------------- Get All Wishlist Users by Id ------
    it("should throw an error for getting All Wishlist Users [without usersInGroup inside wishlist]", async () => {
        const next = jest.fn();
        await wishlistControllers.getWishlistAllUsers(
            {
                params: {
                    id: idWishlist
                }
            },
            {},
            next
        );
        expect(next).toBeCalled();
    });

    it("should throw an error for getting All Wishlist Users [without req]", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlistAllUsers(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    it("should throw an error for getting All Wishlist Users [invalid id]", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlistAllUsers(
            {
                params: {
                    id: "123"
                }
            },
            {},
            next
        );

        expect(next).toBeCalled();
    });

    //! ----------------------- Get One Wishlist by Name ------
    it("should get one wishlist by name", async () => {
        const json = jest.fn();
        await wishlistControllers.getWishlistName(
            {
                params: {
                    name: nameWishlist
                }
            },
            {
                json
            },
            {}
        );
        expect(json).toBeCalled();
    });

    it("should throw an error for getting a wishlist [without req]", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlistName(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    it("should throw an error for getting a wishlist[invalid id]", async () => {
        const next = jest.fn();

        await wishlistControllers.getWishlistName(
            {
                params: {
                    name: ""
                }
            },
            {},
            next
        );

        expect(next).toBeCalled();
    });


    //! ----------------------- delete One Wishlist ---------
    it("should delete one wishlist by id", async () => {
        const json = jest.fn();

        await wishlistControllers.deleteWishlist(
            {
                params: {
                    id: idWishlist
                }
            },
            {
                json
            },
            {}
        );
        deleteOwner(idOwner);
        expect(json).toBeCalled();
    });

    it("should throw an error for deleting a wishlist[without req]", async () => {
        const next = jest.fn();

        await wishlistControllers.deleteWishlist(
            {},
            {},
            next
        );

        expect(next).toBeCalled();
    });

    it("should throw an error for deleting a wishlist[invalid id]", async () => {
        const next = jest.fn();

        await wishlistControllers.deleteWishlist(
            {
                params: {
                    id: "123"
                }
            },
            {},
            next
        );

        expect(next).toBeCalled();
    });



});