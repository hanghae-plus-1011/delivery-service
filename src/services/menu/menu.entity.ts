import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from '../store/store.entity';

import { CreateMenuDto } from './menu.controller';

@Entity()
export class Menu {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ManyToOne(() => Store, (store) => store.menus)
  store: number;

  @ApiProperty({
    example: 1,
    description: 'store id',
  })
  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @ApiProperty({
    example: '돌쇠비빔밥',
    description: '메뉴 이름',
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  menuName: string;

  @ApiProperty({
    example: 9900,
    description: '메뉴 가격',
  })
  @Column({ type: 'int', precision: 10, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(menu: CreateMenuDto) {
    Object.assign(this, menu);
  }
}
