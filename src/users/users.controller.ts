import {
  Controller,
  Body,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UnauthorizedException
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
    const result = await this.usersService.getUserInfoByUserId(query.id);
    return result;
  }

  @Get('')
  async getUserInfo(@Req() req: Request): Promise<any> {
    if (req.user.id) {
      console.log(req.user.id);
      const result = await this.usersService.getUserInfoByUserId(req.user.id);
      return result;
    }
    throw new UnauthorizedException();
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

  @Delete('')
  async delete(@Body() data: UsersDto.DeleteUsersDto): Promise<any> {
    const result = await this.usersService.delete(data);
    return result;
  }
}
