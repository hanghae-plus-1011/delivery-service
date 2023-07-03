import { Test, TestingModule } from '@nestjs/testing';
import { CreateMenuDto, MenuController } from './menu.controller';
import { menuDBFixture } from './menu.fixture';

describe('MenuController', () => {
  let menuController: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
    }).compile();

    menuController = module.get<MenuController>(MenuController);
  });

  it('특정 메뉴id를 가진 메뉴를 출력한다', () => {
    const id = 1; // id = 1인 메뉴를 출력한다고 가정
    expect(menuController.getMenuById(id)).toEqual(
      menuDBFixture.find((menu) => menu.id === id),
    );
  });

  it('없는 메뉴를 출력하려고 하면 에러를 던진다', () => {
    const id = 100; // id = 100인 메뉴는 없다고 가정
    expect(() => menuController.getMenuById(id)).toThrow();
  });

  it('가게에 메뉴를 추가한다', () => {
    const newMenu: CreateMenuDto = {
      storeId: 1, // id=1인 Store를 가정
      menuName: '파스타',
      price: 10,
    };
    const result = menuController.addMenu(newMenu);
    expect(result).toEqual(newMenu);
  });

  it('없는 가게에 메뉴를 추가하려고 하면 에러를 던진다', () => {
    const newMenu: CreateMenuDto = {
      storeId: 100, // id=100인 가게는 없다고 가정
      menuName: '파스타',
      price: 10,
    };

    expect(() => menuController.addMenu(newMenu)).toThrow();
  });

  // Q. delete는 어떻게 처리할것인지(실제로 삭제할지 아니면 status를 -1로 바꿀지 등) 고민해보기
  it('메뉴를 삭제한다', () => {
    const id = 1; // Assuming that there is a menu with id = 1

    const menuIndex = menuDBFixture.findIndex((menu) => menu.id === id);
    menuController.deleteMenu(id);

    expect(menuDBFixture.findIndex((menu) => menu.id === id)).toEqual(-1);
  });

  // 없는 메뉴를 삭제하려고 할 때
  it('없는 메뉴를 삭제하려고 하면 에러를 던진다', () => {
    const id = 100; // Assuming that there is no menu with id = 100

    expect(() => menuController.deleteMenu(id)).toThrow();
  });
});
