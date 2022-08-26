import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getUserUsername = async (username) => {
    const user = await prisma.user.findUnique({
        where: {
            username
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

const updateUser = async (username, userInfo) => {
    const user = await prisma.user.update({
        where: {
            username
        },
        data: { ...userInfo }
    })
    return user;
}

const deleteUser = async (username) => {
    const user = await prisma.user.delete({
        where: {
            username
        }
    })
    return user;
}

export default { getAll, getUserUsername, getUserId, addUser, updateUser, deleteUser };