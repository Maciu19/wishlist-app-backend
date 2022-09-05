import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const itemsInWishlists = await prisma.itemWishlist.findMany();
    return itemsInWishlists;
}

const getItemsInWishlist = async (id) => {
    const itemsInWishlist = await prisma.itemWishlist.findUnique({
        where: {
            id
        },
        include: {
            item: true,
            wishlist: true
        }
    })
    return itemsInWishlist;
}

const addItemsInWishlist = async (info) => {
    const itemsInWishlist = await prisma.itemWishlist.create({
        data: { ...info }
    })
    return itemsInWishlist;
}

const updateItemsInWishlist = async (id, info) => {
    const itemsInWishlist = await prisma.itemWishlist.update({
        where: {
            id
        },
        data: { ...info }
    })
    return itemsInWishlist;
}


const deleteItemsInWishlist = async (id) => {
    const itemsInWishlist = await prisma.itemWishlist.delete({
        where: {
            id
        }
    })
    return itemsInWishlist;
}

export default { getAll, getItemsInWishlist, addItemsInWishlist, updateItemsInWishlist, deleteItemsInWishlist };