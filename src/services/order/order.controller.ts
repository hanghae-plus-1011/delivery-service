import {
  Controller,
  Post,
  Get,
  // Put,
  Body,
  // Delete,
  // Param,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { LoggerService } from '../../libs/logger/logger.service';

@Controller('api/orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private loggerService: LoggerService,
  ) { }

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
    console.log('테스트');
    this.orderService.createOrder(createOrderDto);
    this.loggerService.log('Create order');
    return;
  }

  // @Put()

  // @Delete()
}
