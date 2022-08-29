/*
  Warnings:

  - Added the required column `itemId` to the `itemWishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itemwishlist` ADD COLUMN `itemId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userdetails` MODIFY `dob` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `itemWishlist` ADD CONSTRAINT `itemWishlist_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
