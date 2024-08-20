import { Controller, Get, Req } from "@nestjs/common";
@Controller()
export class AppController {
  constructor() {}
  @Get()
  getHello(@Req() req): string {
    return `Welcome ${req.rawHeaders[0]}`;
  }
}
