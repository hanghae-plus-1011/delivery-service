import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Store } from '../store/store.entity';
import { Customer } from '../customer/customer.entity';

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

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order; // 주문 id

    @OneToOne(() => Customer)
    recipient: Customer; // 고객 id

    @ManyToOne(() => Store)
    store: Store; // 매장 id
}