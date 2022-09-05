import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const users = await prisma.user.findMany();
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
            userInGroup: true
        }
    })
    return user;
}

const getUserId = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user;
}

const addUser = async (userInfo) => {
    const user = await prisma.user.create({
        data: { ...userInfo }
    });
    return user;
}

const updateUser = async (email, userInfo) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: { ...userInfo }
    })
    return user;
}

const deleteUser = async (email) => {
    const user = await prisma.user.delete({
        where: {
            email
        }
    })
    return user;
}

export default { getAll, getUserEmail, getUserId, addUser, updateUser, deleteUser };