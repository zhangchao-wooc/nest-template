import { Strategy } from 'passport-feishu';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeishuStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: 'cli_a52a4239d2b8500c',
      clientSecret: 'gLHE6Dm7MxHtsgjzKGkEXcQKOBNPklKs',
      callbackURL: 'https://wooc.com:8000/api/auth/feishu/callback',
      appType: 'internal'
    });
  }

  async validate(accessToken: any, refreshToken: any, profile: any, cb: any) {
    console.log('feishu-strategy-validate', accessToken, refreshToken, profile)
    cb(null, profile)
  }
}
