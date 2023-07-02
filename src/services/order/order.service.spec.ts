// import { Test, TestingModule } from '@nestjs/testing';
import { TestBed } from '@automock/jest';
import { OrderService } from './order.service';

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
  let mockCreateOrder: jest.SpyInstance;

  beforeAll(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [OrderService],
    // }).compile();

    // orderService = module.get<OrderService>(OrderService);
    const { unit, unitRef } = TestBed.create(OrderService)
      // .mock(HttpService)
      // .using({ get: jest.fn() })
      // .mock(Logger)
      // .using({ log: jest.fn() })
      // .mock(CatsDal)
      // .using({ saveCats: jest.fn() })
      .compile();

    orderService = unit;
    mockCreateOrder = jest.spyOn(orderService, 'createOrder');
  });
  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('주문 생성', () => {
    describe('주문 생성 기본 동작', () => {
      const mockCreateOrderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [{ id: 1, quantity: 1, storeId: 2 }],
      };

      it('createOrder mocking  확인', () => {
        orderService.createOrder(mockCreateOrderRequestInfo);

        expect(mockCreateOrder).toBeDefined();
        expect(mockCreateOrder).toHaveBeenCalled();
        expect(orderService.createOrder).toBe(mockCreateOrder);
      });

      it('OrderService createOrder 동작 검증', () => {
        const result = orderService.createOrder(mockCreateOrderRequestInfo);

        expect(orderService.createOrder).toBeDefined();
        expect(orderService.createOrder).toHaveBeenCalled();
        expect(orderService.createOrder).toHaveBeenCalledWith(
          mockCreateOrderRequestInfo,
        );
        expect(result).toBe(true);
      });
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
      // 예외 발생 추가
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
