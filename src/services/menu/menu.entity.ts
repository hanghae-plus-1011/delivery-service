import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Store } from '../store/store.entity';
  

@Entity()
export class Menu {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ManyToOne(() => Store, (store) => store.menus)
  store: Store;

  @ApiProperty({
    example: '돌쇠비빔밥',
    description: '메뉴 이름',
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  menuName: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  menuImage: string;

  @ApiProperty({
    example: 9900,
    description: '메뉴 가격',
  })
  @Column({ type: 'int', precision: 10, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 10,
    description: '메뉴 선택 수량',
  })
  @Column({ type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  constructor(partial: Partial<Menu>) {
    Object.assign(this, partial);
  }
}