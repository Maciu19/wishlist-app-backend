/*
  Warnings:

  - A unique constraint covering the columns `[avatar]` on the table `userDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `userdetails` ADD COLUMN `avatar` VARCHAR(400) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `userDetails_avatar_key` ON `userDetails`(`avatar`);
