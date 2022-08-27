import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const addresses = await prisma.userAddress.findMany();
    return addresses;
}

const getAddress = async (id) => {
    const address = await prisma.userAddress.findUnique({
        where: {
            id
        }
    });
    return address;
}

const addAddress = async (info) => {
    const address = await prisma.userAddress.create({
        data: { ...info }
    });
    return address;
}

const updateAddress = async (id, info) => {
    const address = await prisma.userAddress.update({
        where: {
            id
        },
        data: { ...info }
    });
    return address;
}

const deleteAddress = async (id) => {
    const address = await prisma.userAddress.delete({
        where: {
            id
        }
    });
    return address;
}

export default { getAll, getAddress, addAddress, updateAddress, deleteAddress };