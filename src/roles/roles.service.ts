import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthZService } from 'nest-authz';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { RolesEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<any>,
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
