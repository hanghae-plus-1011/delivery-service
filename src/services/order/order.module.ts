import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { LoggerService } from '../../libs/logger/logger.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, LoggerService],
})
export class OrderModule { }
