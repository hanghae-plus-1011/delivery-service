import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '@services/customer/customer.entity';
import { OrderEntity } from '@services/order/order.entity';
import { Store } from '@services/store/store.entity';

@Entity()
export class Review {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Store)
  store: Store;

  @OneToOne(() => OrderEntity)
  order: OrderEntity;

  @ApiProperty({
    example: '맛있습니다! 다음에 또 시켜먹을려구용. 별점 5개 드립니다.',
    description: '리뷰 내용',
  })
  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  content: string;

  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);
  }
}
