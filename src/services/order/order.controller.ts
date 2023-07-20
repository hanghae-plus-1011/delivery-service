import {
  Controller,
  Post,
  Get,
  // Put,
  Body,
  // Delete,
  // Param,
  Query,
  Inject,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { AppLogger } from '../../shared/logger/logger.service';

@Controller('api/orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private readonly appLogger: AppLogger,
  ) {
    this.appLogger.setContext('OrderService');
  }

  @Get()
  getOrders(@Query() query) {
    this.orderService.getOrderByCustomer(query);
    return;
  }

  // @Get(':orderId')
  // getOrder(@Param() param) {
  //   this.orderService.getOrder(param);
  //   return;
  // }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    this.orderService.createOrder(createOrderDto);
    this.appLogger.log('Create Order!!'); //
    return;
  }

  // @Put()

  // @Delete()
}
