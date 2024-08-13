import { RemoveRoleDto } from './../roles/dto/remove-role.dto';
import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';

@ApiTags('permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    return this.permissionsService.create({
      ...createPermissionDto,
      creator: createPermissionDto.creator || req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, {
      ...updatePermissionDto,
      editor: updatePermissionDto.editor || req.user.id,
    });
  }

  @Delete(':id')
  remove(
    @Req() req: Request,
    @Param('id') id: string,
    removePermissionDto: RemovePermissionDto,
  ) {
    return this.permissionsService.remove(+id, {
      ...removePermissionDto,
      editor: removePermissionDto.editor || req.user.id,
    });
  }
}
