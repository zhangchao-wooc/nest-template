import { HttpCode, HttpStatus, Request, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeaders } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto, CreateUsersDto } from './auth.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data: LoginDto) {
    console.log('login', data)
    return this.authService.login(data);
  }
}
