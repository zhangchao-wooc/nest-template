import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthZService } from 'nest-authz';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { QueryDomainListDto } from './dto/query-domain.dto';
import { DomainEntity } from './entities/domain.entity';
import { UsersEntity } from '@/users/users.entity';
import { UsersService } from '@/users/users.service';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(DomainEntity)
    private domainRepository: Repository<any>,
    private readonly usersService: UsersService,
    private readonly authZService: AuthZService,
  ) {}
  async create(createDomainDto: CreateDomainDto) {
    // const addDomainResult = this.authZService.addRoleForUser()
    const result = await this.domainRepository.insert(createDomainDto);
    return result.raw.affectedRows != 0;
  }

  findAll() {
    return this.domainRepository
      .createQueryBuilder('domain')
      .where({ status: 'NORMAL' })
      .getMany();
  }

  async findByPage(data: QueryDomainListDto) {
    const skip = (data.page - 1) * data.pageSize;
    const query = this.domainRepository
      .createQueryBuilder('domain')
      .where({ status: 'NORMAL', ...data.data });

    const list: DomainEntity[] | [] = await query
      .skip(skip)
      .take(data.pageSize)
      .orderBy({
        create_time: data.order || 'DESC',
      })
      .cache(true)
      .getMany();

    const total: number = await query.getCount();

    const promiseArray: any[] = [];
    list.forEach((entity: DomainEntity) => {
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
    return this.domainRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateDomainDto: UpdateDomainDto) {
    const result = await this.domainRepository.update(id, updateDomainDto);
    return result.raw.affectedRows != 0;
  }

  async remove(id: number) {
    const result = await this.domainRepository.update(id, {
      status: 'DELETED',
    });
    return result.raw.affectedRows != 0;
  }
}
