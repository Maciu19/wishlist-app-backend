import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const users = await prisma.user.findMany({
        include: {
            userDetails: {
                include: {
                    userAddress: true
                }
            },
            wishlist: {
                include: {
                    itemWishlist: {
                        include: {
                            purchase: true
                        }
                    },
                    groupWishlist: true
                }
            },
            userInGroup: true,
            purchase: true,
            notification: true
        }
    });
    return users;
}

const getUserId = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            userDetails: {
                include: {
                    userAddress: true
                }
            },
            wishlist: {
                include: {
                    itemWishlist: {
                        include: {
                            purchase: true
                        }
                    },
                    groupWishlist: true
                }
            },
            userInGroup: true,
            purchase: true,
            notification: true
        }
    })
    return user;
}

const getUserEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            userDetails: {
                include: {
                    userAddress: true
                }
            },
            wishlist: {
                include: {
                    itemWishlist: {
                        include: {
                            purchase: true
                        }
                    },
                    groupWishlist: true
                }
            },
            userInGroup: true,
            purchase: true,
            notification: true
        }
    })
    return user;
}

const addUser = async (userInfo) => {
    const user = await prisma.user.create({
        data: { ...userInfo },
        include: {
            userDetails: {
                include: {
                    userAddress: true
                }
            },
            wishlist: {
                include: {
                    itemWishlist: {
                        include: {
                            purchase: true
                        }
                    },
                    groupWishlist: true
                }
            },
            userInGroup: true,
            purchase: true,
            notification: true
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
            userDetails: {
                include: {
                    userAddress: true
                }
            },
            wishlist: {
                include: {
                    itemWishlist: {
                        include: {
                            purchase: true
                        }
                    },
                    groupWishlist: true
                }
            },
            userInGroup: true,
            purchase: true,
            notification: true
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
            userDetails: {
                include: {
                    userAddress: true
                }
            },
            wishlist: {
                include: {
                    itemWishlist: {
                        include: {
                            purchase: true
                        }
                    },
                    groupWishlist: true
                }
            },
            userInGroup: true,
            purchase: true,
            notification: true
        }
    })
    return user;
}

export default { getAll, getUserId, getUserEmail, addUser, updateUser, deleteUser };