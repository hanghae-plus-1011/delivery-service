import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Menu } from '../menu/menu.entity';
import { Order } from '../order/order.entity';

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

  @ManyToOne(() => Order)
  order: Order; // 주문 id
}
