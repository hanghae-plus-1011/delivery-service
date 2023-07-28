import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';
import { Store } from '../store/store.entity';

@Index('delivery_FK', ['recipientId'], {})
@Index('delivery_FK_1', ['orderId'], {})
@Index('delivery_FK_2', ['storeId'], {})
@Entity('delivery', { schema: 'delivery-service' })
export class Delivery {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '배달id' })
  id: number;

  @Column('int', { name: 'order_id', comment: '주문id' })
  orderId: number;

  @Column('int', { name: 'store_id', comment: '매장id' })
  storeId: number;

  @Column('varchar', {
    name: 'recipient_id',
    comment: '수령자(사용자)id',
    length: 30,
  })
  recipientId: string;

  @Column('varchar', {
    name: 'delivery_status',
    comment: '배달 상태: started(배달 시작), complete(배달 완료)',
    length: 30,
    default: () => "'started'",
  })
  deliveryStatus: string;

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

  @ManyToOne(() => User, (user) => user.deliveries, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'recipient_id', referencedColumnName: 'id' }])
  recipient: User;

  @ManyToOne(() => Order, (order) => order.deliveries, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order;

  @ManyToOne(() => Store, (store) => store.deliveries, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToOne,
//   CreateDateColumn,
//   JoinColumn,
// } from 'typeorm';
// import { OrderEntity } from '../order/order.entity';
// import { Store } from '../store/store.entity';
// import { Customer } from '../user/customer.entity';

// @Entity()
// export class Delivery {
//   @PrimaryGeneratedColumn({
//     type: 'int',
//     comment: '배달 id',
//   })
//   id: number;

//   @Column({
//     type: 'tinyint',
//     comment: '배달 상태 - 0: 배달 중, 1: 배달완료',
//   })
//   deliveryStatus: string;

//   @CreateDateColumn({
//     type: 'timestamp',
//     comment: '배달 시작 시간',
//   })
//   startedAt: Date;

//   @Column({
//     type: 'timestamp',
//     comment: '배달 완료 시간',
//   })
//   completedAt: Date;

//   @OneToOne(() => OrderEntity)
//   @JoinColumn()
//   order: OrderEntity; // 주문 id

//   @OneToOne(() => Customer)
//   recipient: Customer; // 고객 id

//   @ManyToOne(() => Store)
//   store: Store; // 매장 id
// }
