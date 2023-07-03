import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private readonly orderEntity: Repository<Order>,
  ) { }

  createOrder = (orderData) => {
    return true;
  };
}
