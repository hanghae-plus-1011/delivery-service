import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

type Order = {
  id: number;
  orderStatus: number;
  createdAt: string;
  updatedAt: string;
  storeId: number;
  customerId: number;
};
@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) { }

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
      throw new Error(); // 예외 처리 validation으로 묶어서 validation 파일로 묶음
    }
    return this.orderRepository.createOrder(orderData);
  };

  getOrderByCustomer = (orderData) => {
    orderData.updatedAt = this.getPreviousDateTimeToString(0, 3);
    const result = this.orderRepository.getOrderByCustomer(orderData);

    if (!this.checkCustomerMatch(orderData, result)) {
      throw new Error();
    }

    if (!this.isAllDatesWithinSearchableDate(result, orderData.updatedAt)) {
      throw new Error();
    }
    return result;
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

  isQuantitySumLessThanTen = (arr) => {
    const quantitySum = arr.reduce((sum, obj) => {
      return sum + obj.quantity;
    }, 0);
    return quantitySum <= 10;
  };

  // getOrderByCustomer 사용
  getPreviousDateTimeToString = (
    year?: number,
    month?: number,
    day?: number,
  ): string => {
    const threeMonthsAgoDateTime = this.subtractDateTime(year, month, day);
    return this.formatDateTimeToString(threeMonthsAgoDateTime);
  };

  subtractDateTime = (year?: number, month?: number, day?: number): Date => {
    const today = new Date();

    if (year !== undefined) {
      today.setFullYear(today.getFullYear() - year);
    }
    if (month !== undefined) {
      today.setMonth(today.getMonth() - month);
    }
    if (day !== undefined) {
      today.setDate(today.getDate() - day);
    }

    return today;
  };

  formatDateTimeToString = (dateTime: Date): string => {
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    const DateTimeToString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return DateTimeToString;
  };

  isAllDatesWithinSearchableDate = (obj: any, compareDate: string): boolean => {
    // TODO: 인자 any 수정
    const compareDateTime = new Date(compareDate);
    if (obj.length === 0) return true;

    return obj.every((item) => {
      const date = new Date(item.updatedAt);
      return date > compareDateTime;
    });
  };

  checkCustomerMatch = (
    customer: { customerId: number },
    orders: Order[],
  ): boolean => {
    for (const order of orders) {
      if (order.customerId !== customer.customerId) {
        return false;
      }
    }
    return true;
  };
}
