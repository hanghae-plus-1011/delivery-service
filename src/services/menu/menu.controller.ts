import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Menu } from './menu.entity';
import { menuDBFixture } from './menu.fixture';

// export class MenuDto {
//   storeId: number;

//   menuName: string;

//   price: number;
// }
// export class CreateMenuDto {
//   storeId: number;

//   menuName: string;

//   price: number;
// }

@Controller('menu')
export class MenuController {
  @Get(':id')
  @HttpCode(200)
  getMenuById() {
    return 'OK';
  }

  @Post()
  @HttpCode(201)
  addMenu() {
    return 'Created';
  }

  @Patch(':id')
  @HttpCode(204)
  updateMenu() {
    return 'Updated';
  }

  @Delete(':id')
  @HttpCode(204)
  deleteMenu() {
    return 'Deleted';
  }
}
