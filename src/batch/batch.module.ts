import { Module } from "@nestjs/common";
import { CoreModule } from "../common/core/core.module";

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: []
})
export class BatchModule {}
