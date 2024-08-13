import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceEntity } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourceRepository: Repository<any>,
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
}
