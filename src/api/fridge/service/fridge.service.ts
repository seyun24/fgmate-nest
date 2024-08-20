import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/service/prisma.service";
import ApiResponseStatus from "../../../common/response/api.response.status";
import { Fridge, Prisma } from "@prisma/client";
import { FridgeDto } from "../dto/fridge.dto";

@Injectable()
export class FridgeService {
  constructor(private readonly prisma: PrismaService) {}

  async createFridge(fridgeName: string , userid: bigint): Promise<bigint> {
    try {
        const fridgeId  =  await this.prisma.$transaction(async (prisma)=> {
          let fridge: Fridge  = await prisma.fridge.create({data: {fridgeName: fridgeName}});
          const fridgeGroup = await prisma.fridgeGroup.create({data: {userId: userid, fridgeId: fridge.fridgeId }});
          return fridge.fridgeId;
        })
        return fridgeId;
    } catch (error) {
        throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async updateFridge(fridgeName: string, fridgeId: bigint): Promise<void> {
    try {
        await this.prisma.fridge.update( {
          where: { fridgeId: fridgeId },
          data: { fridgeName: fridgeName },
        });
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async findAllFridges(userId: bigint): Promise<FridgeDto[]> {
    try {
      const fridges = await this.prisma.fridge.findMany({
        select: {
          fridgeName: true,
          fridgeId: true,
        },
        where: {
          fridgeGroups: {
            some: {
              userId: 1,
            }
          }
        }
      });
      return fridges;
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async deleteFridge(fridgeId: bigint): Promise<void> {
      try {
          await this.prisma.fridge.delete({
            where: {
              fridgeId: fridgeId
            }
          })
      } catch (error) {
        throw ApiResponseStatus.DATABASE_ERROR;
      }
  }
}