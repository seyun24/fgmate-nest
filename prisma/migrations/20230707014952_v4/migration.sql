-- DropIndex
DROP INDEX `Product_fridgeId_key` ON `Product`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_fridgeId_fkey` FOREIGN KEY (`fridgeId`) REFERENCES `Fridge`(`fridgeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
