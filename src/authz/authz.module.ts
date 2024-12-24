import { Module } from '@nestjs/common';
import { AuthorizationService } from './authz.service';
import { AuthorizationController } from './authz.controller';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
