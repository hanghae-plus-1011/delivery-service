import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

@Index('review_FK_1', ['reviewerId'], {})
@Index('review_FK', ['orderId'], {})
@Entity('review', { schema: 'delivery-service' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '리뷰id' })
  id: number;

  @Column('varchar', {
    name: 'reviewer_id',
    comment: '리뷰 작성자(사용자)id',
    length: 30,
  })
  reviewerId: string;

  @Column('int', { name: 'order_id', comment: '주문id' })
  orderId: number;

  @Column('text', { name: 'content', comment: '리뷰내용' })
  content: string;

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

  @ManyToOne(() => Order, (order) => order.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'reviewer_id', referencedColumnName: 'id' }])
  reviewer: User;
}

// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import {
//   Column,
//   Entity,
//   ManyToOne,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Customer } from '../user/customer.entity';
// import { Store } from '../store/store.entity';
// import { OrderEntity } from '../order/order.entity';

// @Entity()
// export class Review {
//   @ApiProperty({
//     example: 1,
//     description: 'id',
//   })
//   @PrimaryGeneratedColumn({ type: 'int' })
//   @IsNotEmpty()
//   @IsNumber()
//   id!: number;

//   @ManyToOne(() => Customer)
//   customer: Customer;

//   @ManyToOne(() => Store)
//   store: Store;

//   @OneToOne(() => OrderEntity)
//   order: OrderEntity;

//   @ApiProperty({
//     example: '맛있습니다! 다음에 또 시켜먹을려구용. 별점 5개 드립니다.',
//     description: '리뷰 내용',
//   })
//   @Column({ type: 'text' })
//   @IsString()
//   @IsNotEmpty()
//   content: string;

//   constructor(partial: Partial<Review>) {
//     Object.assign(this, partial);
//   }
// }
