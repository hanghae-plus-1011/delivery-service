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
import { Delivery } from '../delivery/delivery.entity';
import { Menu } from '../menu/menu.entity';
import { Order } from '../order/order.entity';
import { Owner } from '../owner/owner.entity';

@Index('store_FK', ['ownerId'], {})
@Entity('store', { schema: 'delivery-service' })
export class Store {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '매장id' })
  id: number;

  @Column('varchar', { name: 'name', comment: '매장 이름', length: 20 })
  name: string;

  @Column('varchar', {
    name: 'business_num',
    comment: '사업자 등록번호',
    length: 10,
  })
  businessNum: string;

  @Column('varchar', { name: 'contact', comment: '연락처', length: 15 })
  contact: string;

  @Column('varchar', { name: 'address', comment: '주소', length: 100 })
  address: string;

  @Column('varchar', { name: 'owner_id', comment: '사장님id', length: 30 })
  ownerId: string;

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

  @OneToMany(() => Cart, (cart) => cart.store)
  carts: Cart[];

  @OneToMany(() => Delivery, (delivery) => delivery.store)
  deliveries: Delivery[];

  @OneToMany(() => Menu, (menu) => menu.store)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];

  @ManyToOne(() => Owner, (owner) => owner.stores, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: Owner;
}

// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Menu } from '../menu/menu.entity';
// import { Owner } from '../owner/owner.entity';
// import { Review } from '../review/review.entity';

// @Entity()
// export class Store {
//   @ApiProperty({
//     example: 1,
//     description: 'id',
//   })
//   @PrimaryGeneratedColumn({ type: 'int' })
//   @IsNotEmpty()
//   @IsNumber()
//   id!: number;

//   @ManyToOne(() => Owner, (owner) => owner.stores)
//   owner: Owner;

//   @ApiProperty({
//     example: '매장',
//     description: '매장 이름',
//   })
//   @Column({ type: 'varchar', length: 50 })
//   @IsString()
//   @IsNotEmpty()
//   storeName: string;

//   @ApiProperty({
//     example: '서울특별시 강남구 역삼로19길 3-45',
//     description: '매장 주소',
//   })
//   @Column({ type: 'varchar', length: 100 })
//   @IsString()
//   @IsNotEmpty()
//   address: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @OneToMany(() => Menu, (menu) => menu.store)
//   menus: Menu[];

//   @OneToMany(() => Review, (review) => review)
//   reviews: Review[];

//   constructor(partial: Partial<Store>) {
//     Object.assign(this, partial);
//   }
// }
