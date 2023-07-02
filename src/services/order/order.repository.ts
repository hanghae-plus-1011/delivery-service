import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  createOrder = (orderData) => {
    return true;
  };
}
