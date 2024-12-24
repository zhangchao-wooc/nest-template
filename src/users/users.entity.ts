import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: null,
    name: 'user_name',
    length: 50,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    default: null,
    name: 'email',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    default: null,
    length: 11,
    unique: true,
  })
  phoneNumber: string;

  @Column({ type: 'varchar', default: null, name: 'password', length: 255 })
  password: string;

  @Column({ type: 'varchar', default: null, name: 'avatar' })
  avatar: string;

  @Column({ type: 'varchar', default: null, name: 'introduce' })
  introduce: string;

  @Column({ type: 'tinyint', default: 0, name: 'is_deleted' })
  isDeleted?: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @DeleteDateColumn()
  deleted_time: Date;
}
