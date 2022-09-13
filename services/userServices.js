import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const users = await prisma.user.findMany({
        include: {
            userDetails: true,
            wishlist: true,
            userInGroup: true,
            purchase: true
        }
    });
    return users;
}

const getUserEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            userDetails: true,
            wishlist: true,
            userInGroup: true,
            purchase: true
        }
    })
    return user;
}

const addUser = async (userInfo) => {
    const user = await prisma.user.create({
        data: { ...userInfo },
        include: {
            userDetails: true,
            wishlist: true,
            userInGroup: true,
            purchase: true
        }
    });
    return user;
}

const updateUser = async (email, userInfo) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: { ...userInfo },
        include: {
            userDetails: true,
            wishlist: true,
            userInGroup: true,
            purchase: true
        }
    })
    return user;
}

const deleteUser = async (email) => {
    const user = await prisma.user.delete({
        where: {
            email
        },
        include: {
            userDetails: true,
            wishlist: true,
            userInGroup: true,
            purchase: true
        }
    })
    return user;
}

export default { getAll, getUserEmail, addUser, updateUser, deleteUser };