import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthZService } from 'nest-authz';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { QueryRoleListDto } from './dto/query-role.dto';
import { RolesEntity } from './entities/role.entity';
import { UsersEntity } from '@/users/users.entity';
import { UsersService } from '@/users/users.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<any>,
    private readonly usersService: UsersService,
    private readonly authZService: AuthZService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const result = await this.rolesRepository.insert(createRoleDto);
    return result;
  }

  async findAll() {
    return this.rolesRepository
      .createQueryBuilder('roles')
      .where({ status: 'NORMAL' })
      .getMany();
  }

  async findByPage(data: QueryRoleListDto) {
    const skip = (data.page - 1) * data.pageSize;
    const query = this.rolesRepository
      .createQueryBuilder('roles')
      .where({ status: 'NORMAL', ...data.data });

    const list: RolesEntity[] | [] = await query
      .skip(skip)
      .take(data.pageSize)
      .orderBy({
        create_time: data.order || 'DESC',
      })
      .cache(true)
      .getMany();

    const total: number = await query.getCount();

    const promiseArray: any[] = [];
    list.forEach((entity: RolesEntity) => {
      console.log('entity:', entity);
      const create_time = dayjs(entity.create_time).format(
        'YYYY/MM/DD HH:mm:ss',
      );
      const update_time = dayjs(entity.update_time).format(
        'YYYY/MM/DD HH:mm:ss',
      );

      const newPromise = new Promise(async (resolve) => {
        const creatorInfo: UsersEntity | null =
          await this.usersService.getUserInfoByUserId({
            id: entity.creator,
          });
        resolve({
          ...entity,
          create_time,
          update_time,
          creator: creatorInfo?.userName || '',
        });
      });
      promiseArray.push(newPromise);
    });

    return {
      page: data.page,
      pageSize: data.pageSize,
      total,
      data: await Promise.all(promiseArray),
    };
  }

  findOne(id: number) {
    return this.rolesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(id, updateRoleDto);
  }

  remove(id: number, removeRoleDto: RemoveRoleDto) {
    return this.rolesRepository.update(id, {
      status: 'DELETED',
      editor: removeRoleDto.editor,
    });
  }
}
