import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FridgeService } from "../service/fridge.service";
import ApiResponse from "../../../common/response/api.response";
import { Fridge } from "@prisma/client";
import { FridgeDto } from "../dto/fridge.dto";

@Controller('app/fridge')
export class FridgeController{
  constructor(private readonly fridgeService: FridgeService) {}

  @Post('/:fridgeName')
  async createFridge(@Param('fridgeName') fridgeName: string): Promise<ApiResponse<bigint>> {
    try {

      const userId = 1n;
      const fridgeId = await this.fridgeService.createFridge(fridgeName, userId);
      return new ApiResponse<bigint>(fridgeId);
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Get()
  async findAllFridges(): Promise<ApiResponse<FridgeDto[]>> {
    try {
      const userId = 1n;
      const fridges = await this.fridgeService.findAllFridges(userId);
      return new ApiResponse<FridgeDto[]>(fridges);
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Patch('/:fridgeName/:fridgeId')
  async updateFridge(@Param('fridgeName') fridgeName: string, @Param('fridgeId') fridgeId: bigint): Promise<ApiResponse<string>> {
    try {
      await this.fridgeService.updateFridge(fridgeName, fridgeId);
      return new ApiResponse<string>('냉장고 수정 완료');
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Delete('/:fridgeId')
  async deleteFridge( @Param('fridgeId') fridgeId: bigint): Promise<ApiResponse<string>> {
    try {
      await this.fridgeService.deleteFridge(fridgeId);
      return new ApiResponse<string>('냉장고 삭제 완료');
    } catch (error) {
      return new ApiResponse(error);
    }
  }

}