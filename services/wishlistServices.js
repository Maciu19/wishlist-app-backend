import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const whislists = await prisma.wishlist.findMany({
        include: {
            owner: true,
            itemWishlist: {
                include: {
                    item: true
                }
            },
            groupWishlist: true
        }
    });
    return whislists;
}

const getWishlistById = async (id) => {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            id
        },
        include: {
            owner: true,
            itemWishlist: {
                include: {
                    item: true
                }
            },
            groupWishlist: true
        }
    })
    return wishlist;
}

const getWishlistByName = async (name) => {
    const wishlist = await prisma.wishlist.findUnique({
        where: {
            name
        },
        include: {
            owner: true,
            itemWishlist: {
                include: {
                    item: true
                }
            },
            groupWishlist: true
        }
    })
    return wishlist;
}

const addWishlist = async (wishlistInfo) => {
    const wishlist = await prisma.wishlist.create({
        data: { ...wishlistInfo },
        include: {
            owner: true,
            itemWishlist: {
                include: {
                    item: true
                }
            },
            groupWishlist: true
        }
    })
    return wishlist;
}

const updateWishlist = async (id, wishlistInfo) => {
    const wishlist = await prisma.wishlist.update({
        where: {
            id
        },
        data: { ...wishlistInfo },
        include: {
            owner: true,
            itemWishlist: {
                include: {
                    item: true
                }
            },
            groupWishlist: true
        }
    })
    return wishlist;
}


const deleteWishlist = async (id) => {
    const wishlist = await prisma.wishlist.delete({
        where: {
            id
        },
        include: {
            owner: true,
            itemWishlist: {
                include: {
                    item: true
                }
            },
            groupWishlist: true
        }
    })
    return wishlist;
}

export default { getAll, getWishlistById, getWishlistByName, addWishlist, updateWishlist, deleteWishlist };