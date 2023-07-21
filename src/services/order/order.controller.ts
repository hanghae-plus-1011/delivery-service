import {
  Controller,
  Post,
  Get,
  // Put,
  Body,
  // Delete,
  // Param,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { AppLogger } from '../../shared/logger/logger.service';

@Controller('api/orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private readonly appLogger: AppLogger,
  ) {
    this.appLogger.setContext('Order');
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
  createOrder(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    this.orderService.createOrder(createOrderDto);
    this.appLogger.log('Success', `${req.method}-${req.originalUrl}`); //
    return;
  }

  // @Put()

  // @Delete()
}
