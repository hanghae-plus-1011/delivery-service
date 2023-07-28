import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Store } from '../store/store.entity';

@Index('menu_FK', ['storeId'], {})
@Entity('menu', { schema: 'delivery-service' })
export class Menu {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '메뉴id' })
  id: number;

  @Column('varchar', { name: 'name', comment: '메뉴명', length: 20 })
  name: string;

  @Column('int', { name: 'price', comment: '가격' })
  price: number;

  @Column('int', { name: 'store_id', comment: '매장id' })
  storeId: number;

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

  @OneToMany(() => Cart, (cart) => cart.menu)
  carts: Cart[];

  @ManyToOne(() => Store, (store) => store.menus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}

// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Store } from '../store/store.entity';

// import { CreateMenuDto } from './menu.controller';

// @Entity()
// export class Menu {
//   @ApiProperty({
//     example: 1,
//     description: 'id',
//   })
//   @PrimaryGeneratedColumn({ type: 'int' })
//   @IsNotEmpty()
//   @IsNumber()
//   id!: number;

//   @ManyToOne(() => Store, (store) => store.menus)
//   store: number;

//   @ApiProperty({
//     example: 1,
//     description: 'store id',
//   })
//   @Column({ type: 'int' })
//   @IsNotEmpty()
//   @IsNumber()
//   storeId: number;

//   @ApiProperty({
//     example: '돌쇠비빔밥',
//     description: '메뉴 이름',
//   })
//   @Column({ type: 'varchar', length: 50 })
//   @IsString()
//   @IsNotEmpty()
//   menuName: string;

//   @ApiProperty({
//     example: 9900,
//     description: '메뉴 가격',
//   })
//   @Column({ type: 'int', precision: 10, scale: 2 })
//   @IsNumber()
//   @IsNotEmpty()
//   price: number;

//   constructor(menu: CreateMenuDto) {
//     Object.assign(this, menu);
//   }
// }
