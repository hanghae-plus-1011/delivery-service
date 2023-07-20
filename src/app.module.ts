import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { CustomerModule } from './services/customer/customer.module';
import { CartModule } from './services/cart/cart.module';
import { BookmarkModule } from './services/bookmark/bookmark.module';
import { NotificationModule } from './services/notification/notification.module';
import { OwnerModule } from './services/owner/owner.module';
import { StoreModule } from './services/store/store.module';
import { MenuModule } from './services/menu/menu.module';
import { ReviewModule } from './services/review/review.module';
import { OrderModule } from './services/order/order.module';
import { DeliveryModule } from './services/delivery/delivery.module';
import { PaymentModule } from './services/payment/payment.module';
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
    CustomerModule,
    OrderModule,
    DeliveryModule,
    StoreModule,
    PaymentModule,
    BookmarkModule,
    ReviewModule,
    CartModule,
    MenuModule,
    NotificationModule,
    OwnerModule,
    OrderItemModule,
  ],

  controllers: [AppController, HealthCheckController],
  providers: [AppService],
  exports: [SharedModule],
})
export class AppModule { } //
