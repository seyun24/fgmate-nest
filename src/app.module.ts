import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AuthModule } from "./api/auth/auth.module";
import { FridgeModule } from "./api/fridge/fridge.module";
import { ProductModule } from "./api/product/product.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    AuthModule,
    FridgeModule,
    ProductModule,
    ScheduleModule.forRoot()]
  ,
  controllers: [AppController]
})
export class AppModule {}
