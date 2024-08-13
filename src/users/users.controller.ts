import {
  Controller,
  Body,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/users/users.decorator';
import { UsersService } from '@/users/users.service';
import * as UsersDto from '@/users/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserInfoByUserId(
    @Query() query: UsersDto.GetUsersByIdDto,
  ): Promise<any> {
    console.log('query', query);
    const result = await this.usersService.getUserInfoByUserId(query);
    return result;
  }

  @Get('')
  async getUserInfo(@Req() req: Request): Promise<any> {
    const result = await this.usersService.getUserInfoByUserId({
      id: req.user.id,
    });
    return result;
  }

  @Public()
  @Post('')
  async createUser(@Body() data: UsersDto.CreateUsersDto): Promise<any> {
    const result = await this.usersService.create(data);
    return result;
  }

  @Put('')
  async update(@Query() query: UsersDto.UpdateUsersDto): Promise<any> {
    const result = await this.usersService.update(query);
    return result;
  }

  @Get('total')
  async geUserTotal(): Promise<any> {
    const result = await this.usersService.getUserTotal();
    return result;
  }

  @Delete('')
  async delete(@Body() data: UsersDto.DeleteUsersDto): Promise<any> {
    const result = await this.usersService.delete(data);
    return result;
  }
}
