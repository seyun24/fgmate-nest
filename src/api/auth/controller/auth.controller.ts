import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {User} from "@prisma/client";
import ApiResponse from "../../../common/response/api.response";
import { AuthInfoDto } from "../dto/auth-info.dto";


@Controller('app/auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Get('/list')
    async get(): Promise<User[]> {
        return this.authService.getAuth();
    }

    @Post('/kakao-login')
    async kakaoLogin(@Body('accessToken') accessToken: string): Promise<ApiResponse<AuthInfoDto>> {
        try {
            const kakaoProfile = await this.authService.fetchKakao(accessToken);
            const userInfo = await this.authService.kakaoLogin(kakaoProfile);
            return new ApiResponse<AuthInfoDto>(userInfo);
        }catch (error){
            return new ApiResponse(error);
        }
    }

    @Get('/test/t')
    async getTest(): Promise<ApiResponse<User[]>> {
        try {
            const data = await this.authService.getAuth();
            return new ApiResponse<User[]>(data);
        } catch (error) {
            return new ApiResponse<User[]>(error);
        }

    }

    @Patch('/:name')
    async chageNickName(@Param('name') name: string): Promise<ApiResponse<String>> {
        try {
            const userId = 2;
            await this.authService.changeNickName(userId, name);
            return new ApiResponse<String>('닉네임 설정 완료');
        } catch (error) {
            throw new Error(error);
        }
    }
}
