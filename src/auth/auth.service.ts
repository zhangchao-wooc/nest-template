import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserInfoOnPhoneNumber(phoneNumber);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, phoneNumber: user.phoneNumber };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
