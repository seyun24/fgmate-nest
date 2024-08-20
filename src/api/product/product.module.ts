import { Module } from "@nestjs/common";
import { CoreModule } from "../../common/core/core.module";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { TasksService } from "../../common/service/task.service";
@Module({
  imports: [CoreModule],
  controllers: [ProductController],
  providers: [ProductService, TasksService]
})
export class ProductModule {}