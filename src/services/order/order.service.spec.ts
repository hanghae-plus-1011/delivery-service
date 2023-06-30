import { Test, TestingModule } from '@nestjs/testing';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });
  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('주문 생성', () => {
    describe('주문 생성 기본 동작', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [{ id: 1, quantity: 1, storeId: 2 }],
      };
      it('OrderService createOrder 동작 검증', () => {
        const spy = jest.spyOn(orderService, 'createOrder');
        const result = orderService.createOrder(orderRequestInfo);

        expect(orderService.createOrder).toBeDefined();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(orderRequestInfo);
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
    // 배달 주문은 하나의 매장에서만 가능하고, 한번에 10개까지 메뉴를 주문할 수 있다
    // 한번의 주문에 메뉴가 10개까지인지? 총 주문수량이 10개까지인지 조건 확인!!
    it('한번에 10종류의 메뉴까지만 주문이 가능하다.', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [
          { id: 1, quantity: 1, storeId: 2 },
          { id: 2, quantity: 1, storeId: 2 },
          { id: 3, quantity: 1, storeId: 2 },
          { id: 4, quantity: 1, storeId: 2 },
          { id: 5, quantity: 1, storeId: 2 },
          { id: 6, quantity: 1, storeId: 2 },
          { id: 7, quantity: 1, storeId: 2 },
          { id: 8, quantity: 1, storeId: 2 },
          { id: 9, quantity: 1, storeId: 2 },
          { id: 10, quantity: 1, storeId: 2 },
          { id: 11, quantity: 1, storeId: 2 },
          { id: 12, quantity: 1, storeId: 2 },
        ],
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

  describe('주문 조회', () => {
    describe('주문 조회 기본 동작', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [{ id: 1, quantity: 1, storeId: 2 }],
      };
      it('OrderService getOrder 동작 검증', () => {
        const spy = jest.spyOn(orderService, 'getOrder');
        const result = orderService.getOrder(orderRequestInfo);

        expect(orderService.getOrder).toBeDefined();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(orderRequestInfo);
        expect(result).toBe(true);
      });
    });
  });

  describe('주문 리스트 조회 제한 조건', () => {
    it('주문은 ', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [],
      };
      expect(() => orderService.getOrder(orderRequestInfo)).toThrow();
    });
    // 배달 주문은 하나의 매장에서만 가능하고, 한번에 10개까지 메뉴를 주문할 수 있다
    // 한번의 주문에 메뉴가 10개까지인지? 총 주문수량이 10개까지인지 조건 확인!!
    it('한번에 10종류의 메뉴까지만 주문이 가능하다.', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [
          { id: 1, quantity: 1, storeId: 2 },
          { id: 2, quantity: 1, storeId: 2 },
          { id: 3, quantity: 1, storeId: 2 },
          { id: 4, quantity: 1, storeId: 2 },
          { id: 5, quantity: 1, storeId: 2 },
          { id: 6, quantity: 1, storeId: 2 },
          { id: 7, quantity: 1, storeId: 2 },
          { id: 8, quantity: 1, storeId: 2 },
          { id: 9, quantity: 1, storeId: 2 },
          { id: 10, quantity: 1, storeId: 2 },
          { id: 11, quantity: 1, storeId: 2 },
          { id: 12, quantity: 1, storeId: 2 },
        ],
      };
      expect(() => orderService.getOrder(orderRequestInfo)).toThrow();
    });
  });

  describe('주문 리스트 조회', () => {
    describe('주문 리스트 조회 기본 동작', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [{ id: 1, quantity: 1, storeId: 2 }],
      };
      it('OrderService getOrder 동작 검증', () => {
        const spy = jest.spyOn(orderService, 'getOrder');
        const result = orderService.getOrder(orderRequestInfo);

        expect(orderService.getOrder).toBeDefined();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(orderRequestInfo);
        expect(result).toBe(true);
      });
    });
  });

  describe('주문 리스트 조회 제한 조건', () => {
    it('주문은 ', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [],
      };
      expect(() => orderService.getOrder(orderRequestInfo)).toThrow();
    });
    // 배달 주문은 하나의 매장에서만 가능하고, 한번에 10개까지 메뉴를 주문할 수 있다
    // 한번의 주문에 메뉴가 10개까지인지? 총 주문수량이 10개까지인지 조건 확인!!
    it('한번에 10종류의 메뉴까지만 주문이 가능하다.', () => {
      const orderRequestInfo: OrderRequestInfo = {
        id: 1,
        orderItems: [
          { id: 1, quantity: 1, storeId: 2 },
          { id: 2, quantity: 1, storeId: 2 },
          { id: 3, quantity: 1, storeId: 2 },
          { id: 4, quantity: 1, storeId: 2 },
          { id: 5, quantity: 1, storeId: 2 },
          { id: 6, quantity: 1, storeId: 2 },
          { id: 7, quantity: 1, storeId: 2 },
          { id: 8, quantity: 1, storeId: 2 },
          { id: 9, quantity: 1, storeId: 2 },
          { id: 10, quantity: 1, storeId: 2 },
          { id: 11, quantity: 1, storeId: 2 },
          { id: 12, quantity: 1, storeId: 2 },
        ],
      };
      expect(() => orderService.getOrder(orderRequestInfo)).toThrow();
    });
  });
});
