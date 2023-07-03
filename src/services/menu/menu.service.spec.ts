import { Test, TestingModule } from '@nestjs/testing';
import {
  validMenu,
  invalidMenuName,
  invalidMenuPrice,
  nonExistingMenu,
  existingMenu,
} from './menu.fixture';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  describe('메뉴 추가(AddMenu)', () => {
    it('메뉴 정보가 올바르다면 메뉴가 추가되어야 한다.', () => {
      const res = service.addMenu(validMenu);

      expect(res).toEqual({
        menu: {
          menuName: validMenu.menuName,
          price: validMenu.price,
        },
      });
    });

    it('메뉴 이름이 비정상적으로 입력된 경우, 오류를 반환해야 한다.', () => {
      expect(service.addMenu(invalidMenuName)).toThrowError(
        BadRequestException,
      );
    });

    it('메뉴 가격이 비정상적으로 입력된 경우, 오류를 반환해야 한다.', () => {
      expect(service.addMenu(invalidMenuPrice)).toThrowError(
        BadRequestException,
      );
    });

    it('메뉴가 이미 존재할 경우, 오류를 반환해야 한다.', () => {
      expect(service.addMenu(existingMenu)).toThrowError(ConflictException);
    });
  });

  describe('메뉴 제거(RemoveMenu)', () => {
    it('메뉴가 존재하면 제거되어야 한다.', () => {
      const res = service.removeMenu(validMenu);

      expect(res).toEqual({});
    });

    it('존재하지 않는 메뉴를 제거하려고 시도하면, 오류를 반환해야 한다.', () => {
      expect(service.removeMenu(nonExistingMenu)).toThrowError(
        NotFoundException,
      );
    });
  });
});
