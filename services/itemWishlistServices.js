import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const itemsInWishlists = await prisma.itemWishlist.findMany({
        include: {
            item: true,
            wishlist: true
        }
    });
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

const getItemsInWishlist_WishlistAndItemId = async (itemId, wishlistId) => {
    const itemsInWishlist = await prisma.itemWishlist.findUnique({
        where: {
            wishlistId_itemId: {
                itemId: itemId,
                wishlistId: wishlistId
            },

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
        data: { ...info },
        include: {
            item: true,
            wishlist: true
        }
    })
    return itemsInWishlist;
}

const updateItemsInWishlist = async (id, info) => {
    const itemsInWishlist = await prisma.itemWishlist.update({
        where: {
            id
        },
        data: { ...info },
        include: {
            item: true,
            wishlist: true
        }
    })
    return itemsInWishlist;
}


const deleteItemsInWishlist = async (id) => {
    const itemsInWishlist = await prisma.itemWishlist.delete({
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

export default { getAll, getItemsInWishlist, getItemsInWishlist_WishlistAndItemId, addItemsInWishlist, updateItemsInWishlist, deleteItemsInWishlist };