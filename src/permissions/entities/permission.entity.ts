import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { OperationTypeEnum } from '../enum';

@Entity({ name: 'permissions' })
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: null,
    name: 'name',
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    default: null,
    name: 'desc',
    length: 100,
  })
  desc: string;

  @Column({
    type: 'enum',
    enum: OperationTypeEnum,
    default: OperationTypeEnum.READ_ANY,
  })
  type: OperationTypeEnum;

  @Column({
    type: 'varchar',
    default: null,
    name: 'user_id',
  })
  userId: string;

  @Column({
    type: 'int',
    default: null,
    name: 'resource_id',
  })
  resourceId: number;

  @Column({
    type: 'int',
    default: null,
    name: 'domain_id',
  })
  domainId: number;

  @Column({ type: 'varchar', default: 'NORMAL', name: 'status' })
  status: string;

  @Column({ type: 'varchar', default: null, name: 'creator' })
  creator: string;

  @Column({ type: 'varchar', default: null, name: 'editor' })
  editor: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @DeleteDateColumn()
  deleted_time: Date;
}
