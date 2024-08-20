-- CreateTable
CREATE TABLE `User` (
    `userId` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `infoId` BIGINT NOT NULL,
    `name` VARCHAR(191) NULL,
    `profileImg` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,

    UNIQUE INDEX `User_infoId_key`(`infoId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fridge` (
    `fridgeId` BIGINT NOT NULL AUTO_INCREMENT,
    `fridgeName` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`fridgeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FridgeGroup` (
    `gorupId` BIGINT NOT NULL AUTO_INCREMENT,
    `fridgeId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`gorupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `productId` BIGINT NOT NULL AUTO_INCREMENT,
    `fridgeId` BIGINT NOT NULL,
    `date` VARCHAR(191) NULL,
    `productImg` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
