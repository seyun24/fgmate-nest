import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../common/service/prisma.service";
import {User} from "@prisma/client";
import axios from "axios";
import { AuthKakaoDto } from "../dto/auth-kakao.dto";
import ApiResponseStatus from "../../../common/response/api.response.status";
import { AuthInfoDto } from "../dto/auth-info.dto";
import { API_URL } from "../../../common/constant/constants";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    async getAuth(): Promise<User[]> {
        let userList = await this.prisma.user.findMany();
        return userList;
    }

    async changeNickName(userId: number, name: string): Promise<void> {
        try {
            const result = await this.prisma.user.update({
                where: {
                    userId: userId
                },
                data: {
                    name: name
                },
            });
            console.log(result);
        } catch (error) {
            throw ApiResponseStatus.DATABASE_ERROR;
        }
    }

    async kakaoLogin(kakaoDto: AuthKakaoDto): Promise<AuthInfoDto> {
        const { id, userEmail } = kakaoDto;

        try {
            const result = await this.prisma.$transaction(async (prism) => {
                let user = await prism.user.findUnique({ where: { infoId: id } });

                if (!user) {
                    user = await prism.user.create({ data: { infoId: id, email: userEmail } });
                }

                const userId = user.userId;
                const jwt = this.jwtService.sign({ userId });

                return { userId, jwt, loginInfo: 1 };
            });

            return result;
        } catch (error) {
            throw ApiResponseStatus.DATABASE_ERROR;
        }
    }

    async fetchKakao(accessToken: string): Promise<AuthKakaoDto>  {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        };

        try {
            const response = await axios.get(API_URL.KAKAO, {
                headers,
            });

            const { id, kakao_account: { profile: { nickname }, has_email, email } } = response.data;
            const userEmail = has_email ? email : null;

            return { id, userEmail, nickname };
        } catch (error) {
            throw ApiResponseStatus.KAKAO_REQ_FAIL;
        }
    }

    async validateUser(userId: number) {

        const user = await this.prisma.user.findUnique({ where: { userId } });
        return user;
    }

}
