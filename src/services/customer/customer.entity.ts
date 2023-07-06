import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../cart/cart.entity';
import { Review } from '../review/review.entity';

@Entity()
export class Customer {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ApiProperty({
    example: 'archepro84@gmail.com',
    description: '고객의 이메일',
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'archepro84',
    description: '고객의 닉네임',
  })
  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    example: 'aaaa4321!!',
    description: '고객의 비밀번호',
  })
  @Column({ type: 'varchar', length: 40, select: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Cart, (cart) => cart.Customer)
  Carts: Cart[];

  @OneToMany(() => Review, (review) => review)
  reviews: Cart[];

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
