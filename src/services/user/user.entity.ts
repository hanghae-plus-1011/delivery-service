import { Column, Entity, OneToMany } from 'typeorm';
import { Bookmark } from '../bookmark/bookmark.entity';
import { Cart } from '../cart/cart.entity';
import { Delivery } from '../delivery/delivery.entity';
import { Order } from '../order/order.entity';
import { Review } from '../review/review.entity';

@Entity('user', { schema: 'delivery-service' })
export class User {
  @Column('varchar', {
    primary: true,
    name: 'id',
    comment: '고객id',
    length: 30,
  })
  id: string;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '비밀번호',
    length: 20,
  })
  password: string | null;

  @Column('varchar', { name: 'name', comment: '고객명', length: 20 })
  name: string;

  @Column('varchar', { name: 'phone_num', comment: '핸드폰 번호', length: 15 })
  phoneNum: string;

  @Column('varchar', {
    name: 'address',
    nullable: true,
    comment: '주소',
    length: 100,
  })
  address: string | null;

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

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Delivery, (delivery) => delivery.recipient)
  deliveries: Delivery[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}

// import {
//   Column,
//   CreateDateColumn,
//   DeleteDateColumn,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { Cart } from '../cart/cart.entity';
// import { Review } from '../review/review.entity';

// @Entity()
// export class Customer {
//   @ApiProperty({
//     example: 1,
//     description: 'id',
//   })
//   @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
//   @IsNotEmpty()
//   @IsNumber()
//   id!: number;

//   @ApiProperty({
//     example: 'archepro84@gmail.com',
//     description: '고객의 이메일',
//   })
//   @Column({ type: 'varchar', length: 50, unique: true })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     example: 'archepro84',
//     description: '고객의 닉네임',
//   })
//   @Column({ type: 'varchar', length: 20 })
//   @IsString()
//   @IsNotEmpty()
//   nickname: string;

//   @ApiProperty({
//     example: 'aaaa4321!!',
//     description: '고객의 비밀번호',
//   })
//   @Column({ type: 'varchar', length: 40, select: false })
//   @IsString()
//   @IsNotEmpty()
//   password: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date | null;

//   @OneToMany(() => Cart, (cart) => cart.Customer)
//   Carts: Cart[];

//   @OneToMany(() => Review, (review) => review)
//   reviews: Cart[];

//   constructor(partial: Partial<Customer>) {
//     Object.assign(this, partial);
//   }
// }
