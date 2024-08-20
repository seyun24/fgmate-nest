-- AddForeignKey
ALTER TABLE `FridgeGroup` ADD CONSTRAINT `FridgeGroup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FridgeGroup` ADD CONSTRAINT `FridgeGroup_fridgeId_fkey` FOREIGN KEY (`fridgeId`) REFERENCES `Fridge`(`fridgeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
