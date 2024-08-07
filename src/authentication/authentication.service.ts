import {
  Inject,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signIn(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserInfoOnPhoneNumber(phoneNumber);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      phoneNumber: user.phoneNumber,
      createTime: new Date().getTime(),
    };
    const token = await this.jwtService.signAsync(payload);

    console.log(7 * 24 * 60 * 60 * 1000);
    await this.cacheManager.set(
      token,
      payload,
      7 * 24 * 60 * 60 * 1000, // 7 day
    );
    return {
      access_token: token,
    };
  }

  async validateUser(account: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(account);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: any) {
    const user = await this.validateUser(data.account, data.password);
    if (user === null)
      throw new HttpException('Invalid username or password', 401);
    const payload = {
      username: user.userName,
      sub: user.id,
      createTime: new Date().getTime(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
