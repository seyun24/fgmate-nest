import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { GroupService } from "../service/group.service";
import ApiResponse from "../../../common/response/api.response";

@Controller('app/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async findGroupUser(): Promise<ApiResponse<any>> {
    try {

    } catch (error) {
      return new ApiResponse(error)
    }
  }

  @Post('/:fridgeId/:userId')
  async inviteGroup(@Param('fridgeId') fridgeId: bigint, @Param('userId') userId: bigint): Promise<ApiResponse<string>> {
    try {
      await this.groupService.inviteGroup(fridgeId, userId);
      return new ApiResponse<string>('가입 완료');
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Delete('/:fridgeId/:userId')
  async outGroup(@Param('fridgeId') fridgeId: bigint, @Param('userId') userId: bigint): Promise<ApiResponse<string>> {
    try {
      await this.groupService.outGroup(fridgeId,userId);
      return new ApiResponse<string>('탈퇴 완료');
    } catch (error) {
      return new ApiResponse(error);
    }
  }
}