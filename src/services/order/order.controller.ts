import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Get()
  getOrders(@Query() query) {
    this.orderService.getOrders(query);
    return;
  }

  @Get(':orderId')
  getOrder(@Param() param) {
    this.orderService.getOrder(param);
    return;
  }

  @Post()
  createOrder(@Body() body) {
    this.orderService.createOrder(body);
    return;
  }

  // @Put()

  // @Delete()
}
