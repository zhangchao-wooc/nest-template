import { Injectable } from '@nestjs/common';
import { AuthZManagementService, AuthZRBACService } from 'nest-authz';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly authZManagementService: AuthZManagementService,
    private readonly authZRBACService: AuthZRBACService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    // return await this.authZManagementService.addPolicies([
    //   ['wooc', 'superuser', 'any'],
    // ]);
    return await this.authZRBACService.addRoleForUser('user_roles', 'user');
  }

  async findAll() {
    return await this.authZManagementService.getPolicy();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
