import { Global, Module } from "@nestjs/common";
import { PrismaService } from "../service/prisma.service";
import { BigIntInterceptor } from "../bigInt.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { S3Service } from "../service/s3.service";

@Global()
@Module({
  providers: [
    S3Service,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntInterceptor,
    },
  ],
  exports: [S3Service, PrismaService],
})
export class CoreModule {}