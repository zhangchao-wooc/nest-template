import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import { AuthenticationService } from './authen.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authenticationService.validateUser(
      {
        account: username,
        password: password,
        validatePassword: true,
      }
    );
    if (user === null) {
      throw new HttpException('Invalid username or password', 500);
    }
    return user;
  }
}
