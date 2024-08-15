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
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { QueryResourceListDto } from './dto/query-resource.dto';

@ApiTags('resource')
@ApiBearerAuth()
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  create(@Req() req: Request, @Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create({
      ...createResourceDto,
      creator: createResourceDto.creator || req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  @Get('type')
  getResourceType() {
    return this.resourceService.getResourceType();
  }

  @Post('list')
  findByPage(@Body() data: QueryResourceListDto) {
    console.log(data);
    return this.resourceService.findByPage(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(+id, {
      ...updateResourceDto,
      editor: updateResourceDto.editor || req.user.id,
    });
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.resourceService.remove(+id, {
      editor: req.user.id,
    });
  }
}
