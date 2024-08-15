import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ResourceTypeEnum } from '../enum';

@Entity({ name: 'resource' })
export class ResourceEntity {
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
    type: 'varchar',
    default: null,
    name: 'value',
    unique: true,
  })
  value: string;

  @Column({
    type: 'enum',
    enum: ResourceTypeEnum,
    default: ResourceTypeEnum.OTHER,
  })
  type: ResourceTypeEnum;

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
