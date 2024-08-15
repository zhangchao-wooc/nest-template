import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { QueryResourceListDto } from './dto/query-resource.dto';
import { ResourceEntity } from './entities/resource.entity';
import { UsersEntity } from '@/users/users.entity';
import { UsersService } from '@/users/users.service';
import { DomainEntity } from '@/domain/entities/domain.entity';
import { DomainService } from '@/domain/domain.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourceRepository: Repository<any>,
    private readonly usersService: UsersService,
    private readonly domainService: DomainService,
  ) {}
  async create(createResourceDto: CreateResourceDto) {
    const result = await this.resourceRepository.insert(createResourceDto);
    return result.raw.affectedRows != 0;
  }

  findAll() {
    return this.resourceRepository
      .createQueryBuilder('resource')
      .where({ status: 'NORMAL' })
      .getMany();
  }

  async findByPage(data: QueryResourceListDto) {
    const skip = (data.page - 1) * data.pageSize;
    const query = this.resourceRepository
      .createQueryBuilder('resource')
      .where({ status: 'NORMAL', ...data.data });

    const list: ResourceEntity[] | [] = await query
      .skip(skip)
      .take(data.pageSize)
      .orderBy({
        create_time: data.order || 'DESC',
      })
      .cache(true)
      .getMany();

    const total: number = await query.getCount();

    const promiseArray: any[] = [];
    list.forEach((entity: ResourceEntity) => {
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
        const domainInfo: DomainEntity | null =
          await this.domainService.findOne(entity.domainId);
        resolve({
          ...entity,
          create_time,
          update_time,
          creator: creatorInfo?.userName || '',
          domain_name: domainInfo?.name || '',
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
    return this.resourceRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateResourceDto: UpdateResourceDto) {
    const result = await this.resourceRepository.update(id, updateResourceDto);
    return result.raw.affectedRows != 0;
  }

  async remove(id: number, data: any) {
    const result = await this.resourceRepository.update(id, {
      status: 'DELETED',
      editor: data.editor,
    });
    return result.raw.affectedRows != 0;
  }

  async getResourceType() {
    return [
      {
        name: 'API 接口',
        value: 'api',
      },
      {
        name: '页面路径',
        value: 'route',
      },
      {
        name: '其他',
        value: 'other',
      },
    ];
  }
}
