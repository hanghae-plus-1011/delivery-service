import { TestBed } from '@automock/jest';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

type OrderItemsRequestInfo = {
  id: number;
  quantity: number;
  storeId: number;
};

type OrderRequestInfo = {
  id: number;
  orderItems: Array<OrderItemsRequestInfo>;
};

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: jest.Mocked<OrderRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(OrderService)
      .mock(OrderRepository)
      .using({ createOrder: jest.fn() })
      // .mock(Logger)
      // .using({ log: jest.fn() })
      // .mock(CatsDal)
      // .using({ saveCats: jest.fn() })
      .compile();

    orderService = unit;
    orderRepository = unitRef.get(OrderRepository);
  });
  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('주문 생성', () => {
    beforeAll(async () => {
      jest.spyOn(orderService, 'createOrder');
    });

    describe('Mocking 테스트', () => {
      it('createOrder mocking  확인', () => {
        expect(jest.isMockFunction(orderService.createOrder)).toBe(true);
        expect(jest.isMockFunction(orderRepository.createOrder)).toBe(true);
      });
      it('automock repository Mocking 확인', () => {
        const mockCreateOrderRequestInfo: OrderRequestInfo = {
          id: 1,
          orderItems: [{ id: 1, quantity: 1, storeId: 2 }],
        };
        orderRepository.createOrder.mockReturnValue(true);
        orderService.createOrder(mockCreateOrderRequestInfo);

        expect(orderRepository.createOrder).toBeDefined();
        expect(orderRepository.createOrder).toHaveBeenCalled();
        expect(orderRepository.createOrder(mockCreateOrderRequestInfo)).toEqual(
          true,
        );
      });
    });

    describe('주문 생성 기본 동작', () => {
      const mockCreateOrderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [{ id: 1, quantity: 1, storeId: 2 }],
      };

      it('OrderService createOrder 동작 검증', () => {
        orderService.createOrder(mockCreateOrderRequestInfo);

        expect(orderService.createOrder).toBeDefined();
        expect(orderService.createOrder).toHaveBeenCalled();
        expect(orderService.createOrder).toHaveBeenCalledWith(
          mockCreateOrderRequestInfo,
        );
        expect(orderRepository.createOrder).toHaveBeenCalled();
      });
    });

    describe('주문 생성 제한 조건', () => {
      it('주문은 하나 이상이 필요하다.', () => {
        const orderRequestInfo: OrderRequestInfo = {
          id: 1,
          orderItems: [],
        };
        expect(() => orderService.createOrder(orderRequestInfo)).toThrow();
      });

      it('한번에 수량 10개까지만 주문이 가능하다.', () => {
        const orderRequestInfo: OrderRequestInfo = {
          id: 1,
          orderItems: [
            { id: 1, quantity: 8, storeId: 2 },
            { id: 2, quantity: 5, storeId: 2 },
            { id: 3, quantity: 3, storeId: 2 },
          ],
        };
        expect(() => orderService.createOrder(orderRequestInfo)).toThrow();
      });
      it('주문은 하나의 매장에서만 주문이 가능하다.', () => {
        const orderRequestInfo: OrderRequestInfo = {
          id: 1,
          orderItems: [
            { id: 1, quantity: 1, storeId: 2 },
            { id: 2, quantity: 1, storeId: 2 },
            { id: 3, quantity: 1, storeId: 2 },
            { id: 4, quantity: 1, storeId: 3 },
            { id: 5, quantity: 1, storeId: 2 },
            { id: 6, quantity: 1, storeId: 2 },
          ],
        };
        expect(() => orderService.createOrder(orderRequestInfo)).toThrow();
      });
    });
  });
});
