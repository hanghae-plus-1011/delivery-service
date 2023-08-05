import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
export class OrderRepository {
  // TODO: DB 연결을 아직 하지 않아 Docker 실행 할 때 오류가 생겨 잠시 수정 > 추후 아래 코드로 변경 예정
  // export class OrderRepository extends OrderEntity {
  //   constructor(
  //     // @InjectRepository(OrderEntity)
  //     // private readonly orderEntity: Repository<OrderEntity>,
  //   ) {
  //     super()
  //   }

  createOrder = (orderData) => {
    return true;
  };

  getOrderByCustomer = (orderData) => {
    return [];
  };
}
