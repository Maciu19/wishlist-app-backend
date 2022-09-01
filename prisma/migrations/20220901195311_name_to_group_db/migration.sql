/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `group` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `group_name_key` ON `group`(`name`);
