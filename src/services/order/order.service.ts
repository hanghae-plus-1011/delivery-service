import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  //   let orderRepository: OrderRepository
  // constructor(
  //   @InjectRepository(Order)
  //   private orderRepository: Repository<Order>,
  // ){ }
  createOrder = (orderData) => {
    if (orderData.orderItems && orderData.orderItems.length === 0) {
      throw new Error(); // 예외 처리
    }
    if (orderData?.orderItems.length > 10) {
      throw new Error(); // 예외 처리
    }
    if (!this.isQuantitySumLessThanTen(orderData.orderItems)) {
      throw new Error(); // 예외 처리
    }
    if (!this.areAllOrderItemStoreEqual(orderData.orderItems)) {
      throw new Error(); // 예외 처리
    }
    return true;
  };

  getOrders = (orderData) => {
    return true;
  };

  getOrder = (orderData) => {
    return true;
  };

  areAllOrderItemStoreEqual = (orderItems) => {
    const firstOrderItemStoreId = orderItems[0].storeId;

    for (let i = 1; i < orderItems.length; i++) {
      if (orderItems[i].storeId !== firstOrderItemStoreId) {
        return false;
      }
    }
    return true;
  };

  isQuantitySumLessThanTen(arr) {
    const quantitySum = arr.reduce((sum, obj) => {
      return sum + obj.quantity;
    }, 0);
    return quantitySum <= 10;
  }
}
