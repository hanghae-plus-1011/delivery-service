import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Index('bookmark_UN', ['userId', 'storeId'], { unique: true })
@Entity('bookmark', { schema: 'delivery-service' })
export class Bookmark {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '즐겨찾기id' })
  id: number;

  @Column('varchar', { name: 'user_id', comment: '사용자id', length: 30 })
  userId: string;

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

  @ManyToOne(() => User, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}

// import {
//   CreateDateColumn,
//   DeleteDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber } from 'class-validator';
// import { Customer } from '../user/customer.entity';

// @Entity()
// export class Bookmark {
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

//   // @ManyToOne(() => Store, (store) => Store.Carts, {
//   //   onDelete: 'SET NULL',
//   //   onUpdate: 'CASCADE',
//   // })
//   // Store: Store;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date | null;

//   constructor(partial: Partial<Bookmark>) {
//     Object.assign(this, partial);
//   }
// }
