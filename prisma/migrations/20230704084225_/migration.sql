/*
  Warnings:

  - A unique constraint covering the columns `[fridgeId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `productName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_fridgeId_key` ON `Product`(`fridgeId`);
