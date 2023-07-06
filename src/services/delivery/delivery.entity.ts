import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '@services/customer/customer.entity';
import { OrderEntity } from '@services/order/order.entity';
import { Store } from '@services/store/store.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '배달 id',
  })
  id: number;

  @Column({
    type: 'tinyint',
    comment: '배달 상태 - 0: 배달 중, 1: 배달완료',
  })
  deliveryStatus: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '배달 시작 시간',
  })
  startedAt: Date;

  @Column({
    type: 'timestamp',
    comment: '배달 완료 시간',
  })
  completedAt: Date;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity; // 주문 id

  @OneToOne(() => Customer)
  recipient: Customer; // 고객 id

  @ManyToOne(() => Store)
  store: Store; // 매장 id
}
