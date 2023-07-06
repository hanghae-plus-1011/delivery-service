import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Store } from '@services/store/store.entity';
import { Customer } from '@services/customer/customer.entity';
import { OrderEntity } from '@services/order/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '결제 id',
  })
  id: number;

  @Column({
    type: 'string',
    comment: '결제 번호',
  })
  paymentNo: string;

  @Column({
    type: 'int',
    comment: '결제 금액',
  })
  paymentAmount: number;

  @Column({
    type: 'tinyint',
    comment:
      '결제 상태 - 0: 결제 요청, 1: 결제 성공, 2: 결제 실패, 3: 취소 요청, 취소 성공, 취소 실패',
  })
  paymentStatus: number;

  @Column({
    type: 'timestamp',
    comment: '결제 완료 시간',
  })
  paidAt: Date;

  @Column({
    type: 'timestamp',
    comment: '취소 완료 시간',
  })
  refundedAt: Date;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity; // 주문 id

  @ManyToOne(() => Store)
  store: Store; // 매장 id

  @ManyToOne(() => Customer)
  payer: Customer; // 이용자 id
}
