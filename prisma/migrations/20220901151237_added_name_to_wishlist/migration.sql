/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wishlist` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `wishlist_name_key` ON `wishlist`(`name`);
