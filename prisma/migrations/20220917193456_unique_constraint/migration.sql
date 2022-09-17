/*
  Warnings:

  - A unique constraint covering the columns `[wishlistId,itemId]` on the table `itemWishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `itemWishlist_wishlistId_itemId_key` ON `itemWishlist`(`wishlistId`, `itemId`);
