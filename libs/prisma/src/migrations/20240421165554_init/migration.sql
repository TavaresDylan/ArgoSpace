-- CreateTable
CREATE TABLE `Rocket` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `imgUrl` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `diameter` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `mass` DOUBLE NOT NULL,
    `firstFlight` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `totalLaunches` INTEGER NOT NULL,
    `totalLandings` INTEGER NOT NULL,
    `totalReflights` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
