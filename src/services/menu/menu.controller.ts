import { Controller } from '@nestjs/common';

@Controller('menu')
export class MenuController {
  addMenu() {
    return 'addMenu';
  }
}
