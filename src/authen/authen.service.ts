import {
  Inject,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UsersService } from '@/users/users.service';
import { UsersEntity } from '@/users/users.entity';
import { ValidateUserDto } from './dto/validate.dto';
import { LocalLoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signIn(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserInfoByPhoneNumber(phoneNumber);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      phoneNumber: user.phoneNumber,
      createTime: new Date().getTime(),
    };
    const token = await this.jwtService.signAsync(payload);

    await this.cacheManager.set(
      token,
      payload,
      7 * 24 * 60 * 60 * 1000, // 7 day
    );
    return {
      access_token: token,
    };
  }

  async validateUser(data: ValidateUserDto): Promise<Omit<UsersEntity, 'password'> | null> {
    const userInfo = await this.usersService.findOne(data.account);
    if (userInfo === null) return null;
    if (data.validatePassword) {
      if (userInfo.password !== data.password) return null;
    }
    const { password, ...rest } = userInfo;
    return rest;
  }

  async login(data: LocalLoginDto): Promise<any> {
    const user = await this.validateUser({
      account: data.account,
      password: data.password,
      validatePassword: true,
    });
    if (user === null)
      throw new HttpException('Invalid username or password', 500);
    const payload = {
      sub: user.id,
      username: user.userName,
      createTime: new Date().getTime(),
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
      token_type: "Bearer"
    };
  }
}
