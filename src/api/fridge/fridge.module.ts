import { Module } from "@nestjs/common";
import { CoreModule } from "../../common/core/core.module";
import { FridgeController } from "./controller/fridge.controller";
import { FridgeService } from "./service/fridge.service";
import { GroupService } from "../group/service/group.service";

@Module({
  imports: [CoreModule],
  controllers: [FridgeController],
  providers: [FridgeService, GroupService]
})
export class FridgeModule {}