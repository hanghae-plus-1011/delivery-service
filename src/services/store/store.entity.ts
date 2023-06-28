import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../menu/menu.entity';
import { Owner } from '../owner/owner.entity';

@Entity()
export class Store {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ManyToOne(() => Owner, (owner) => owner.stores)
  owner: Owner;

  @ApiProperty({
    example: '매장',
    description: '매장 이름',
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @ApiProperty({
    example: '서울특별시 강남구 역삼로19길 3-45',
    description: '매장 주소',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Menu, (menu) => menu.store)
  menus: Menu[];

  constructor(partial: Partial<Store>) {
    Object.assign(this, partial);
  }
}
