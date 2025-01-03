import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizationService } from './authz.service';
import { CreateAuthorizationDto } from './dto/create-authz.dto';
import { UpdateAuthorizationDto } from './dto/update-authz.dto';

@ApiTags('authorization')
@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post()
  create(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    return this.authorizationService.create(createAuthorizationDto);
  }

  @Get()
  findAll() {
    return this.authorizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorizationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorizationDto: UpdateAuthorizationDto,
  ) {
    return this.authorizationService.update(+id, updateAuthorizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorizationService.remove(+id);
  }
}
