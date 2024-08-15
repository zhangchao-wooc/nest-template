import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  AuthZGuard,
  AuthActionVerb,
  AuthAction,
  AuthPossession,
  UsePermissions,
} from 'nest-authz';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { QueryRoleListDto } from './dto/query-role.dto';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Req() req: Request, @Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create({
      ...createRoleDto,
      creator: createRoleDto.creator || req.user.id,
    });
  }

  @Get()
  @UseGuards(AuthZGuard)
  // @UsePermissions({
  //   resource: 'users_list',
  //   action: AuthActionVerb.READ,
  //   possession: AuthPossession.ANY,
  //   // isOwn: (ctx: ExecutionContext) => true,
  // })
  findAll() {
    console.log('role--11');
    return this.rolesService.findAll();
  }

  @Post('list')
  findByPage(@Body() data: QueryRoleListDto) {
    console.log(data);
    return this.rolesService.findByPage(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(+id, {
      ...updateRoleDto,
      editor: updateRoleDto.editor || req.user.id,
    });
  }

  @Delete(':id')
  remove(
    @Req() req: Request,
    @Param('id') id: string,
    removeRoleDto: RemoveRoleDto,
  ) {
    return this.rolesService.remove(+id, {
      ...removeRoleDto,
      editor: removeRoleDto.editor || req.user.id,
    });
  }
}
