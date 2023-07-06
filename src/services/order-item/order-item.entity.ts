import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Menu } from '@services/menu/menu.entity';
import { OrderEntity } from '@services/order/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    comment: '주문 수량',
  })
  quantity: number;

  @OneToOne(() => Menu)
  @JoinColumn()
  menu: Menu; // 메뉴 id

  @ManyToOne(() => OrderEntity)
  order: OrderEntity; // 주문 id
}
