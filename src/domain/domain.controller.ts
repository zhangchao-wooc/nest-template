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
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { QueryDomainListDto } from './dto/query-domain.dto';

@ApiTags('domain')
@ApiBearerAuth()
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  create(@Req() req: Request, @Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create({
      ...createDomainDto,
      creator: createDomainDto.creator || req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.domainService.findAll();
  }

  @Post('list')
  findByPage(@Body() data: QueryDomainListDto) {
    console.log(data);
    return this.domainService.findByPage(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateDomainDto: UpdateDomainDto,
  ) {
    return this.domainService.update(+id, {
      ...updateDomainDto,
      editor: updateDomainDto.editor || req.user.id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainService.remove(+id);
  }
}
