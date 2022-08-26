-- DropIndex
DROP INDEX `user_password_key` ON `user`;

-- AlterTable
ALTER TABLE `item` MODIFY `size` VARCHAR(191) NULL;
