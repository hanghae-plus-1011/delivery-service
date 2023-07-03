import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Menu } from './menu.entity';
import { menuDBFixture } from './menu.fixture';

type MenuType = Menu;

export class CreateMenuDto {
  storeId: number;

  menuName: string;

  price: number;
}

@Controller('menu')
export class MenuController {
  @Get(':id')
  getMenuById(@Param('id') id: number): MenuType {
    return menuDBFixture.find((menu) => menu.id === id);
  }

  // Q. Store의 menus에도 추가되어야 하는데 어떻게 처리하지?
  @Post()
  addMenu(@Body() menu: CreateMenuDto): MenuType {
    const newMenu = new Menu(menu) as MenuType;
    return newMenu;
  }

  @Patch(':id')
  updateMenu(@Param('id') id: number, @Body() menu: CreateMenuDto): MenuType {
    const menuIndex = menuDBFixture.findIndex((menuItem) => menuItem.id === id);
    menuDBFixture[menuIndex] = { ...menuDBFixture[menuIndex], ...menu };
    return menuDBFixture[menuIndex];
  }

  @Delete(':id')
  deleteMenu(@Param('id') id: number): void {
    const menuIndex = menuDBFixture.findIndex((menu) => menu.id === id);
    menuDBFixture.splice(menuIndex, 1);
  }
}
