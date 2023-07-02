import { Controller } from '@nestjs/common';

interface Menu {
  id: number;
  menuName: string;
  price: number;
}

// const createMenuDto = {
//     menuName: '김치찌개',
//     price: 7000,
// }

@Controller('menu')
export class Controller {
  addMenu(menu: Omit<Menu, 'id'>) {
    return 'addMenu';
  }
}
