import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Index('order_item_FK', ['orderId'], {})
@Entity('order_item', { schema: 'delivery-service' })
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '주문 내역id' })
  id: number;

  @Column('int', { name: 'order_id', comment: '주문id' })
  orderId: number;

  @Column('varchar', { name: 'menu_name', comment: '메뉴명', length: 20 })
  menuName: string;

  @Column('int', { name: 'menu_price', comment: '메뉴가격' })
  menuPrice: number;

  @Column('tinyint', { name: 'quantity', comment: '주문수량' })
  quantity: number;

  @Column('datetime', {
    name: 'created_at',
    comment: '생성시간',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    comment: '수정시간',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order;
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToOne,
//   JoinColumn,
// } from 'typeorm';
// import { Menu } from '../menu/menu.entity';
// import { OrderEntity } from '../order/order.entity';

// @Entity()
// export class OrderItem {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     type: 'tinyint',
//     comment: '주문 수량',
//   })
//   quantity: number;

//   @OneToOne(() => Menu)
//   @JoinColumn()
//   menu: Menu; // 메뉴 id

//   @ManyToOne(() => OrderEntity)
//   order: OrderEntity; // 주문 id
// }
