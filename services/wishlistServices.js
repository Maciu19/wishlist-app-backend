import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const whislists = await prisma.wishlist.findMany();
    return whislists;
}

const getWishlistById = async (id) => {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            id
        }
    })
    return wishlist;
}

const getWishlistByName = async (name) => {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            name
        }
    })
    return wishlist;
}

const addWishlist = async (wishlistInfo) => {
    const wishlist = await prisma.wishlist.create({
        data: { ...wishlistInfo }
    })
    return wishlist;
}

const updateWishlist = async (name, wishlistInfo) => {
    const wishlist = await prisma.wishlist.update({
        where: {
            name
        },
        data: { ...wishlistInfo }
    })
    return wishlist;
}


const deleteWishlist = async (name) => {
    const wishlist = await prisma.wishlist.delete({
        where: {
            name
        }
    })
    return wishlist;
}

export default { getAll, getWishlistById, getWishlistByName, addWishlist, updateWishlist, deleteWishlist };