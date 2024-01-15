import { HttpCode, HttpStatus, Request, Res, Body, Controller, Get, Post, UseGuards, Query, Redirect } from '@nestjs/common';
import { ApiTags, ApiHeaders } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { FeishuAuthGuard } from './feishu-auth.guard'
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

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(FeishuAuthGuard)
  @Get('feishu')
  async feishu() {

  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(FeishuAuthGuard)
  @Get('feishu/callback')
  async feishuCallback(@Request() req, @Res() res) {
    // feishu auth success, deal service. Example: create acount、validate user、validate user access
    console.log('feishu/callback', req.user)
    const isAccess = true;
    const isLoginFail = false;
    if (!isLoginFail) {
      if (isAccess) {
        res.redirect('https://wooc.com:8000')
      } else {
        res.redirect('https://wooc.com:8000/403')
      }
    } else {
      res.redirect('https://wooc.com:8000/fail')
    }
  }
}
