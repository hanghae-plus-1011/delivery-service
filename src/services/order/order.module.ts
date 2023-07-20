import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { LoggerModule } from '../../shared/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule { }
