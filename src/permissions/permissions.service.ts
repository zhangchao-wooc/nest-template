import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthZService } from 'nest-authz';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { QueryPermissionListDto } from './dto/query-permission.dto';
import { PermissionsEntity } from './entities/permission.entity';
import { UsersEntity } from '@/users/users.entity';
import { UsersService } from '@/users/users.service';
import {
  customUserPrefix,
  customResourcePrefix,
  customDomainPrefix,
} from '@/utils/casbin';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<any>,
    private readonly usersService: UsersService,
    private readonly authZService: AuthZService,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const result = await this.permissionsRepository.insert(createPermissionDto);
    let addPolicyResult = false;
    if (result.raw.affectedRows != 0) {
      addPolicyResult = await this.authZService.addPolicy(
        customUserPrefix(createPermissionDto.userId),
        customResourcePrefix(createPermissionDto.resourceId),
        createPermissionDto.type,
        customDomainPrefix(createPermissionDto.domainId),
      );
      addPolicyResult && this.authZService.loadPolicy();
    }
    return result.raw.affectedRows != 0 && addPolicyResult;
  }

  findAll() {
    return this.permissionsRepository
      .createQueryBuilder('permissions')
      .where({ status: 'NORMAL' })
      .getMany();
  }

  async findByPage(data: QueryPermissionListDto) {
    const skip = (data.page - 1) * data.pageSize;
    const query = this.permissionsRepository
      .createQueryBuilder('permissions')
      .where({ status: 'NORMAL', ...data.data });

    const list: PermissionsEntity[] | [] = await query
      .skip(skip)
      .take(data.pageSize)
      .orderBy({
        create_time: data.order || 'DESC',
      })
      .cache(true)
      .getMany();

    const total: number = await query.getCount();

    const promiseArray: any[] = [];
    list.forEach((entity: PermissionsEntity) => {
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

  async findOne(id: number) {
    const result = await this.permissionsRepository.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const getInfo = await this.permissionsRepository.findOne({
      where: { id },
    });
    const result = await this.permissionsRepository.update(
      id,
      updatePermissionDto,
    );

    if (getInfo !== null) {
      const oldPolicy = [
        customUserPrefix(getInfo.userId),
        customResourcePrefix(getInfo.resourceId),
        getInfo.type,
        customDomainPrefix(getInfo.domainId),
      ];
      const newPolicy = [
        customUserPrefix(updatePermissionDto.userId || getInfo.userId),
        customResourcePrefix(
          updatePermissionDto.resourceId || getInfo.resourceId,
        ),
        updatePermissionDto.type || getInfo.type,
        customDomainPrefix(updatePermissionDto.domainId || getInfo.domainId),
      ];
      this.authZService.updatePolicy(oldPolicy, newPolicy);
    }

    return result.raw.affectedRows != 0;
  }

  async remove(id: number, removePermissionDto: RemovePermissionDto) {
    const result = await this.permissionsRepository.update(id, {
      status: 'DELETED',
      ...removePermissionDto,
    });
    return result.raw.affectedRows != 0;
  }
}
