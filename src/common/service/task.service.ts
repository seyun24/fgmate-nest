import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { format } from 'date-fns';
import { PrismaService } from "./prisma.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly prisma: PrismaService) {}
  @Cron('10 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 10');
    console.log('성공');
  }

  @Cron('5 * * * * *')
  test() {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyMMdd');
    this.logger.debug('hello world');
    const product =
    this.prisma.product.updateMany({
      where: {
        date : formattedDate
      },
      data: {
        productFg: '2'
      }
    })
    console.log(formattedDate);
  }
}