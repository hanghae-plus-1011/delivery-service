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

export class MenuDto {
  storeId: number;

  menuName: string;

  price: number;
}
export class CreateMenuDto {
  storeId: number;

  menuName: string;

  price: number;
}

@Controller('menu')
export class MenuController {
  @Get(':id')
  getMenuById(@Param('id') id: number): MenuDto {

    return menuDBFixture.find((menu) => menu.id === id);
  }

  @Post()
  addMenu(@Body() menu: CreateMenuDto): MenuDto {
    const newMenu = new Menu(menu) as MenuDto;
    return newMenu;
  }

  @Patch(':id')
  updateMenu(@Param('id') id: number, @Body() menu: CreateMenuDto): MenuDto {
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
