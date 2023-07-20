type OrderItem = {
  id: number;
  quantity: number;
  storeId: number;
};

export class CreateOrderDto {
  id: string;

  orderItems: OrderItem[];
}
