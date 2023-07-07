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
import { CreateOrderDto } from './dto/createOrder.dto';


@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) { }

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
    return;
  }

  // @Put()

  // @Delete()
}
