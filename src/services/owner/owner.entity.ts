import { Column, Entity, OneToMany } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity('owner', { schema: 'delivery-service' })
export class Owner {
  @Column('varchar', {
    primary: true,
    name: 'id',
    comment: '판매자id',
    length: 30,
  })
  id: string;

  @Column('varchar', { name: 'password', comment: '비밀번호', length: 20 })
  password: string;

  @Column('varchar', { name: 'name', comment: '사장님 이름', length: 20 })
  name: string;

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

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];
}

// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Store } from '../store/store.entity';

// @Entity()
// export class Owner {
//   @ApiProperty({
//     example: 1,
//     description: 'id',
//   })
//   @PrimaryGeneratedColumn({ type: 'int' })
//   @IsNotEmpty()
//   @IsNumber()
//   id!: number;

//   // password
//   @ApiProperty({
//     example: '1234',
//     description: '비밀번호',
//   })
//   @Column({ type: 'varchar', length: 100 })
//   @IsString()
//   @IsNotEmpty()
//   password: string;

//   @ApiProperty({
//     example: '김사장',
//     description: '사장님 실명',
//   })
//   @Column({ type: 'varchar', length: 50 })
//   @IsString()
//   @IsNotEmpty()
//   ownerName: string; // 사장님 실명

//   @ApiProperty({
//     example: '123-45-67890',
//     description: '사업자등록번호',
//   })
//   @Column({ type: 'varchar', length: 20 })
//   @IsString()
//   @IsNotEmpty()
//   buissiniessRegistration: string;

//   @OneToMany(() => Store, (store) => store.owner)
//   stores: Store[];

//   constructor(partial: Partial<Owner>) {
//     Object.assign(this, partial);
//   }
// }
