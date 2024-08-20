import { Module } from "@nestjs/common";
import { CoreModule } from "../../common/core/core.module";
import { FridgeController } from "../fridge/controller/fridge.controller";
import { FridgeService } from "../fridge/service/fridge.service";
import { GroupService } from "./service/group.service";

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [GroupService]
})
export class GroupModule {}