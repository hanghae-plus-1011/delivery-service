import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class Owner {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  // password
  @ApiProperty({
    example: '1234',
    description: '비밀번호',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '김사장',
    description: '사장님 실명',
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  ownerName: string; // 사장님 실명

  @ApiProperty({
    example: '123-45-67890',
    description: '사업자등록번호',
  })
  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @IsNotEmpty()
  buissiniessRegistration: string;

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];

  constructor(partial: Partial<Owner>) {
    Object.assign(this, partial);
  }
}
