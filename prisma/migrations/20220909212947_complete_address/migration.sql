/*
  Warnings:

  - You are about to drop the column `detaliedAddress` on the `useraddress` table. All the data in the column will be lost.
  - Added the required column `completeAddress` to the `userAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useraddress` DROP COLUMN `detaliedAddress`,
    ADD COLUMN `completeAddress` VARCHAR(191) NOT NULL;
