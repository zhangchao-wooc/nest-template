import { Reflector } from '@nestjs/core'; // 导入Reflector
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './auth.decorator';

@Injectable()
export class FeishuAuthGuard extends AuthGuard('feishu') {

}
