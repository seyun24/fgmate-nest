/*
  Warnings:

  - The primary key for the `FridgeGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gorupId` on the `FridgeGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `FridgeGroup` DROP PRIMARY KEY,
    DROP COLUMN `gorupId`,
    ADD PRIMARY KEY (`fridgeId`, `userId`);
