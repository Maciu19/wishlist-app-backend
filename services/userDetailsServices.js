import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAllUserDetails = async () => {
    const details = await prisma.userDetails.findMany();
    return details;
}

const getUserDetails = async (id) => {
    const details = await prisma.userDetails.findUnique({
        where: {
            id
        }
    });
    return details;
}

const addUserDetails = async (info) => {
    const details = await prisma.userDetails.create({
        data: { ...info }
    })
    return details;
}

const updateUserDetails = async (id, info) => {
    const details = await prisma.userDetails.update({
        where: {
            id
        },
        data: { ...info }
    })
    return details;
}

const deleteUserDetails = async (id) => {
    const details = await prisma.userDetails.delete({
        where: {
            id
        }
    })
    return details;
}

export default { getAllUserDetails, getUserDetails, addUserDetails, updateUserDetails, deleteUserDetails };