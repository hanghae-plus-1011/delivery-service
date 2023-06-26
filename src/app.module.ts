import { Module } from '@nestjs/common';
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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
