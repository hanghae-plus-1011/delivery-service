import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { UserModule } from './services/user/user.module';
import { CartModule } from './services/cart/cart.module';
import { BookmarkModule } from './services/bookmark/bookmark.module';
import { OwnerModule } from './services/owner/owner.module';
import { StoreModule } from './services/store/store.module';
import { MenuModule } from './services/menu/menu.module';
import { ReviewModule } from './services/review/review.module';
import { OrderModule } from './services/order/order.module';
import { DeliveryModule } from './services/delivery/delivery.module';
// import { DatabaseModule } from './libs/database/database.module';
import { OrderItemModule } from './services/order-item/order-item.module';
import { HealthCheckController } from './services/healthCheck.controller';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        `.env.${process.env.NODE_ENV ?? 'development'}`,
      ),
      cache: true,
      expandVariables: true,
    }),
    SharedModule,
    // DatabaseModule,
    UserModule,
    OrderModule,
    DeliveryModule,
    StoreModule,
    BookmarkModule,
    ReviewModule,
    CartModule,
    MenuModule,
    OwnerModule,
    OrderItemModule,
  ],

  controllers: [AppController, HealthCheckController],
  providers: [AppService],
  exports: [SharedModule],
})
export class AppModule { } //
