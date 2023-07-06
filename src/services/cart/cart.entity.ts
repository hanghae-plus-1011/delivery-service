import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Customer } from '@services/customer/customer.entity';

@Entity()
export class Cart {
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

  // @ManyToOne(() => Menu, (menu) => menu.Carts, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // Menu: Menu;

  @ApiProperty({
    example: 5,
    description: '장바구니 메뉴의 갯수',
  })
  @Column({ type: 'int' })
  @IsInt()
  @IsNotEmpty()
  qty: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(partial: Partial<Cart>) {
    Object.assign(this, partial);
  }
}
