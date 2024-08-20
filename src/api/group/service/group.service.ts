import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/service/prisma.service";
import ApiResponseStatus from "../../../common/response/api.response.status";

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async findGroupUser(fridgeId: bigint): Promise<GroupUserDto[]> {
      try {
        const groups = await this.prisma.user.findMany({
          select: {
            userId: true,
            name: true,
          },
          where: {
            fridges : {
              some: {
                fridgeId: fridgeId
              }
            }
          }
        });
        return groups ;
      } catch (error) {
        throw ApiResponseStatus.DATABASE_ERROR;
      }
  }

  async inviteGroup(fridgeId: bigint, userId: bigint): Promise<void> {
    const existingGroupUser = this.prisma.fridgeGroup.findFirst({
      where: {
        fridgeId: fridgeId,
        userId: userId,
      }
    })

    if (existingGroupUser) {
      throw ApiResponseStatus.DUPLICATED_GROUP_USER;
    }

    try {
      await this.prisma.fridgeGroup.create({
        data: {
          userId: userId,
          fridgeId: fridgeId,
        }
      })
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async outGroup(fridgeId: bigint, userId: bigint): Promise<void> {
    try {
      await this.prisma.fridgeGroup.deleteMany({
        where: {
          fridgeId: fridgeId,
          userId: userId
        }
      })
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }
}