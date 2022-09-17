-- DropIndex
DROP INDEX `userDetails_avatar_key` ON `userdetails`;

-- AlterTable
ALTER TABLE `user` MODIFY `token` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `userdetails` MODIFY `avatar` VARCHAR(500) NULL;
