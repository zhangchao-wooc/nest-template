import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class RolesEntity {
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
