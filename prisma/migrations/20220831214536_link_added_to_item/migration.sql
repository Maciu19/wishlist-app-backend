/*
  Warnings:

  - Added the required column `link` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `item_details_key` ON `item`;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `link` VARCHAR(191) NOT NULL;
