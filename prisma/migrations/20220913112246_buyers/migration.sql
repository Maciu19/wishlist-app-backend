-- CreateTable
CREATE TABLE `_itemWishlistTouser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_itemWishlistTouser_AB_unique`(`A`, `B`),
    INDEX `_itemWishlistTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_itemWishlistTouser` ADD CONSTRAINT `_itemWishlistTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `itemWishlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_itemWishlistTouser` ADD CONSTRAINT `_itemWishlistTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
