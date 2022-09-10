import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const groupsWishlists = await prisma.groupWishlist.findMany({
        include: {
            group: true,
            wishlist: true
        }
    });
    return groupsWishlists;
}

const getGroupWishlist = async (id) => {
    const groupWishlist = await prisma.groupWishlist.findUnique({
        where: {
            id
        },
        include: {
            group: true,
            wishlist: true
        }
    })
    return groupWishlist;
}

const addGroupWishlist = async (info) => {
    const groupWishlist = await prisma.groupWishlist.create({
        data: { ...info },
        include: {
            group: true,
            wishlist: true
        }
    })
    return groupWishlist;
}

const updateGroupWishlist = async (id, info) => {
    const groupWishlist = await prisma.groupWishlist.update({
        where: {
            id
        },
        data: { ...info },
        include: {
            group: true,
            wishlist: true
        }
    })
    return groupWishlist;
}


const deleteGroupWishlist = async (id) => {
    const groupWishlist = await prisma.groupWishlist.delete({
        where: {
            id
        },
        include: {
            group: true,
            wishlist: true
        }
    })
    return groupWishlist;
}

export default { getAll, getGroupWishlist, addGroupWishlist, updateGroupWishlist, deleteGroupWishlist };