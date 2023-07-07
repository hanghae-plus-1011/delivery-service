import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Bookmark {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.Carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CustomerId', referencedColumnName: 'id' }])
  Customer: Customer;

  // @ManyToOne(() => Store, (store) => Store.Carts, {
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // Store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(partial: Partial<Bookmark>) {
    Object.assign(this, partial);
  }
}
