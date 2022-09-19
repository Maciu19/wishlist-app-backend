import wishlistServices from "./wishlistServices.js";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

var wishlistName = "Wishlist 1234";
var wishlistId;
var idOwner;

const createOwner = async () => {
    const owner = await prisma.user.create({
        data: {
            username: "Test1",
            email: "test1@gmail.com",
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

describe("wishlistService", () => {

    it("should get all Wishlists ", async () => {
        const result = await wishlistServices.getAll();

        expect(Array.isArray(result)).toBe(true);
    })

    it("should create a wishlist", async () => {
        const owner = await createOwner();
        idOwner = owner.id;

        const result = await wishlistServices.addWishlist({
            name: wishlistName,
            ownerId: idOwner
        });

        wishlistId = result.id;

        expect(result).toMatchObject({
            id: expect.any(String),
            name: wishlistName,
            isBought: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            ownerId: expect.any(String),
        });
    });

    it("should get a Wishlist by id ", async () => {
        const result = await wishlistServices.getWishlistById(wishlistId);

        expect(result).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            isBought: expect.any(Boolean),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            ownerId: expect.any(String),
        });
    });

    it("should get a Wishlist by Name ", async () => {
        const result = await wishlistServices.getWishlistByName(wishlistName);

        expect(result).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            isBought: expect.any(Boolean),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            ownerId: expect.any(String),
        });
    });

    it("should update a wishlist by id ", async () => {
        const isBoughtValue = true;
        const result = await wishlistServices.updateWishlist(wishlistId, {
            isBought: isBoughtValue
        });

        expect(result).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            isBought: isBoughtValue,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            ownerId: expect.any(String),
        });
    });

    it("should delete wishlists by id ", async () => {
        const result = await wishlistServices.deleteWishlist(wishlistId);

        deleteOwner(idOwner);
        expect(result).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            isBought: expect.any(Boolean),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            ownerId: expect.any(String),
        });
    });


})