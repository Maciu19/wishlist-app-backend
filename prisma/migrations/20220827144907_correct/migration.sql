/*
  Warnings:

  - You are about to drop the column `street` on the `useraddress` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `useraddress` table. All the data in the column will be lost.
  - Added the required column `country` to the `userAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detaliedAddress` to the `userAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useraddress` DROP COLUMN `street`,
    DROP COLUMN `zipCode`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `detaliedAddress` VARCHAR(191) NOT NULL;
