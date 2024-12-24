import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorizationDto } from './create-authz.dto';

export class UpdateAuthorizationDto extends PartialType(CreateAuthorizationDto) {}
