import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CartModule } from './cart/cart.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { OwnerModule } from './owner/owner.module';
import { OwnerController } from './owner/owner.controller';
import { OwnerService } from './owner/owner.service';
import { StoreModule } from './store/store.module';
import { StoreService } from './store/store.service';
import { StoreController } from './store/store.controller';
import { MenuModule } from './menu/menu.module';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { ReviewModule } from './review/review.module';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveryController } from './delivery/delivery.controller';
import { DeliveryService } from './delivery/delivery.service';
import { PaymentModule } from './payment/payment.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

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
  controllers: [
    AppController,
    CustomerController,
    CartController,
    BookmarkController,
    NotificationController,
    StoreController,
    OwnerController,
    ReviewController,
    MenuController,
    DeliveryController,
    PaymentController,
    OrderController,
  ],
  providers: [
    AppService,
    StoreService,
    CartService,
    OwnerService,
    MenuService,
    NotificationService,
    OrderService,
    DeliveryService,
    PaymentService,
    BookmarkService,
    ReviewService,
    CustomerService,
  ],
})
export class AppModule { }
