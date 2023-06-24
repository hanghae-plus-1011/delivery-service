import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';

@Module({
  controllers: [OwnerController]
})
export class OwnerModule {}
