import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Store } from '../store/store.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { Payment } from '../payment/payment.entity';
import { Review } from '../review/review.entity';
// import { Notification } from '../notification/notification.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'orderServiceId',
    comment: '주문 id',
  })
  id: number;

  @Column({
    type: 'tinyint',
    name: 'orderStatus',
    comment:
      '주문 상태 - 0: 주문 요청, 1: 주문 접수, 2: 주문 확정, 3: 취소 요청, 4: 취소 확인, 5: 배달 시작, 6: 배달 완료',
  })
  orderStatus: number;

  @CreateDateColumn()
  createdAt: Date; // 주문 정보 생성 시간

  @UpdateDateColumn() // 데코레이터 확인
  updateAt: Date; // 주문 정보 수정 시간

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[]; // 주문 아이템들

  // // (알림을 DB 처리할껀지 확인!!)
  // @OneToMany(() => Notification, (notification) => notification.order)
  // notifications: Notification[]; // 알림 내역들

  // @OneToOne(() => Payment)
  // @JoinColumn()
  // payment: Payment; // 결제 id

  // @OneToOne(() => Review)
  // @JoinColumn()
  // review: Review; // 리뷰 id

  @ManyToOne(() => Store)
  store: Store; // 매장 id

  @ManyToOne(() => Customer)
  customer: Customer; // 고객 id
}
