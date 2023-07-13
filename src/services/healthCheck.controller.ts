import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get('/healthcheck')
  @HttpCode(200)
  checkHealth() {
    console.log('health check!!');
    return 'OK';
  }
}
