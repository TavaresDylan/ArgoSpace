/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Rocket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Rocket` DROP COLUMN `imgUrl`;

-- CreateTable
CREATE TABLE `RocketImage` (
    `id` VARCHAR(191) NOT NULL,
    `rocketId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RocketImage` ADD CONSTRAINT `RocketImage_rocketId_fkey` FOREIGN KEY (`rocketId`) REFERENCES `Rocket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
