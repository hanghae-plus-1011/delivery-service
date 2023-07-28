import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Delivery } from '../delivery/delivery.entity';
import { User } from '../user/user.entity';
import { Store } from '../store/store.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { Review } from '../review/review.entity';

@Index('order_FK', ['customerId'], {})
@Index('order_FK_1', ['storeId'], {})
@Entity('order', { schema: 'delivery-service' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '주문id' })
  id: number;

  @Column('int', { name: 'store_id', comment: '매장id' })
  storeId: number;

  @Column('varchar', {
    name: 'customer_id',
    comment: '고객(사용자)id',
    length: 30,
  })
  customerId: string;

  @Column('varchar', {
    name: 'order_status',
    comment:
      '주문상태 - orderReceived(주문 접수), cancelReceived(주문 취소 요청), cancelConfirmed(주문 취소), orderConfirmed(주문 확정), deliveryStarted(배달시작), deliveryCompleted(배달완료)',
    length: 30,
    default: () => "'orderReceived'",
  })
  orderStatus: string;

  @Column('datetime', {
    name: 'created_at',
    comment: '생성시간',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    comment: '수정시간',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('varchar', {
    name: 'payment_status',
    comment:
      '결제 상태 - requested(결제 요청), completed(결제 완료), canceled(결제 취소)',
    length: 30,
    default: () => "'requested'",
  })
  paymentStatus: string;

  @Column('varchar', {
    name: 'payment_id',
    nullable: true,
    comment: '결제id(결제고유번호)',
    length: 100,
  })
  paymentId: string | null;

  @Column('int', { name: 'payment_amount', comment: '결제금액' })
  paymentAmount: number;

  @Column('datetime', { name: 'paid_at', nullable: true, comment: '결제시간' })
  paidAt: Date | null;

  @Column('datetime', {
    name: 'refunded_at',
    nullable: true,
    comment: '결제취소시간',
  })
  refundedAt: Date | null;

  @OneToMany(() => Delivery, (delivery) => delivery.order)
  deliveries: Delivery[];

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: User;

  @ManyToOne(() => Store, (store) => store.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.order)
  reviews: Review[];
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
//   OneToOne,
//   CreateDateColumn,
//   JoinColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Customer } from '../user/customer.entity';
// import { Store } from '../store/store.entity';
// import { OrderItem } from '../order-item/order-item.entity';
// import { Payment } from '../payment/payment.entity';
// import { Review } from '../review/review.entity';
// // import { Notification } from '../notification/notification.entity';

// @Entity()
// export class OrderEntity {
//   @PrimaryGeneratedColumn({
//     type: 'int',
//     name: 'orderServiceId',
//     comment: '주문 id',
//   })
//   id: number;

//   @Column({
//     type: 'tinyint',
//     name: 'orderStatus',
//     comment:
//       '주문 상태 - 0: 주문 요청, 1: 주문 접수, 2: 주문 확정, 3: 취소 요청, 4: 취소 확인, 5: 배달 시작, 6: 배달 완료',
//   })
//   orderStatus: number;

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date; // 주문 정보 생성 시간

//   @UpdateDateColumn({ name: 'updated_at' }) // 데코레이터 확인
//   updateAt: Date; // 주문 정보 수정 시간

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
//   orderItems: OrderItem[]; // 주문 아이템들

//   // // (알림을 DB 처리할껀지 확인!!)
//   // @OneToMany(() => Notification, (notification) => notification.order)
//   // notifications: Notification[]; // 알림 내역들

//   // @OneToOne(() => Payment)
//   // @JoinColumn()
//   // payment: Payment; // 결제 id

//   @OneToOne(() => Review)
//   @JoinColumn()
//   review: Review; // 리뷰 id

//   @ManyToOne(() => Store)
//   store: Store; // 매장 id

//   @ManyToOne(() => Customer)
//   customer: Customer; // 고객 id
// }
