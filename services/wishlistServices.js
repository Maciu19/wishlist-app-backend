import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const whislists = await prisma.wishlist.findMany();
    return whislists;
}

const getWishlist = async (id) => {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            id
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

const updateWishlist = async (id, wishlistInfo) => {
    const wishlist = await prisma.wishlist.update({
        where: {
            id
        },
        data: { ...wishlistInfo }
    })
    return wishlist;
}


const deleteWishlist = async (id) => {
    const wishlist = await prisma.wishlist.delete({
        where: {
            id
        }
    })
    return wishlist;
}

export default { getAll, getWishlist, addWishlist, updateWishlist, deleteWishlist };