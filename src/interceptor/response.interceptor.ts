import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}
const FilterPath = { '/deploy': 'post', '/deploy/revert': 'post' };
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    if (request.url === '/app-config/envEnums') {
      console.log('next.handle()', ctx.getResponse());
    }

    if (FilterPath[request.url] === request.method.toLocaleLowerCase()) {
      return next.handle().pipe(
        map((data) => {
          return data;
        }),
      );
    }

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: '请求成功',
          timestamp: new Date().getTime(),
        };
      }),
    );
  }
}
