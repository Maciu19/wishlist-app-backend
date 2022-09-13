/*
  Warnings:

  - You are about to drop the `_itemwishlisttouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_itemwishlisttouser` DROP FOREIGN KEY `_itemWishlistTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_itemwishlisttouser` DROP FOREIGN KEY `_itemWishlistTouser_B_fkey`;

-- DropTable
DROP TABLE `_itemwishlisttouser`;

-- CreateTable
CREATE TABLE `purchase` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `itemWishlistId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_itemWishlistId_fkey` FOREIGN KEY (`itemWishlistId`) REFERENCES `itemWishlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
