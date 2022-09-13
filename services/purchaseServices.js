import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const purchases = await prisma.purchase.findMany({
        include: {
            user: true,
            itemWishlist: true,
        }
    });
    return purchases;
}

const getAllUser = async (userEmail) => {
    const purchases = await prisma.purchase.findMany({
        where: {
            user: {
                email: userEmail
            }
        },
        include: {
            user: true,
            itemWishlist: true,
        }
    })
    return purchases;
}

const getAllWishlist = async (wishlistId) => {
    const purchases = await prisma.purchase.findMany({
        where: {
            itemWishlist: {
                wishlistId
            }
        },
        include: {
            user: true,
            itemWishlist: true
        }
    })
    return purchases;
}

const getPurchase = async (id) => {
    const purchase = await prisma.purchase.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            itemWishlist: true,
        }
    })
    return purchase;
}

const addPurchase = async (info) => {
    const purchase = await prisma.purchase.create({
        data: { ...info },
        include: {
            user: true,
            itemWishlist: true,
        }
    });
    return purchase;
}

const updatePurchase = async (id, info) => {
    const purchase = await prisma.purchase.update({
        where: {
            id
        },
        data: { ...info },
        include: {
            user: true,
            itemWishlist: true,
        }
    })
    return purchase;
}

const deletePurchase = async (id) => {
    const purchase = await prisma.purchase.delete({
        where: {
            id
        },
        include: {
            user: true,
            itemWishlist: true,
        }
    })
    return purchase;
}

export default { getAll, getPurchase, getAllUser, getAllWishlist, addPurchase, updatePurchase, deletePurchase };