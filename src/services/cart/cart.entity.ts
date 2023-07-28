import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Store } from '../store/store.entity';
import { Menu } from '../menu/menu.entity';

@Index('cart_FK', ['userId'], {})
@Index('cart_FK_1', ['storeId'], {})
@Index('cart_FK_2', ['menuId'], {})
@Entity('cart', { schema: 'delivery-service' })
export class Cart {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '장바구니id' })
  id: number;

  @Column('varchar', { name: 'user_id', comment: '사용자id', length: 30 })
  userId: string;

  @Column('int', { name: 'store_id', comment: '매장id' })
  storeId: number;

  @Column('int', { name: 'menu_id', comment: '메뉴id' })
  menuId: number;

  @Column('tinyint', { name: 'quantity', comment: '수량' })
  quantity: number;

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

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Store, (store) => store.carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;

  @ManyToOne(() => Menu, (menu) => menu.carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: Menu;
}

// import {
//   Column,
//   CreateDateColumn,
//   DeleteDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
// import { Customer } from '../user/customer.entity';

// @Entity()
// export class Cart {
//   @ApiProperty({
//     example: 1,
//     description: 'id',
//   })
//   @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
//   @IsNotEmpty()
//   @IsNumber()
//   id!: number;

//   @ManyToOne(() => Customer, (customer) => customer.Carts, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   })
//   @JoinColumn([{ name: 'CustomerId', referencedColumnName: 'id' }])
//   Customer: Customer;

//   // @ManyToOne(() => Menu, (menu) => menu.Carts, {
//   //   onDelete: 'CASCADE',
//   //   onUpdate: 'CASCADE',
//   // })
//   // Menu: Menu;

//   @ApiProperty({
//     example: 5,
//     description: '장바구니 메뉴의 갯수',
//   })
//   @Column({ type: 'int' })
//   @IsInt()
//   @IsNotEmpty()
//   qty: number;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date | null;

//   constructor(partial: Partial<Cart>) {
//     Object.assign(this, partial);
//   }
// }
