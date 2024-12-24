import { Module, Dependencies, ExecutionContext } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import TypeORMAdapter from 'typeorm-adapter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import * as casbin from 'casbin';
import { AuthZModule, AUTHZ_ENFORCER } from 'nest-authz';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from '@/health/health.module';
import { AuthModule } from '@/authen/authen.module';
import { UsersModule } from '@/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToolController } from './tool/tool.controller';
import { ToolService } from './tool/tool.service';
import { ToolModule } from './tool/tool.module';
import { AuthorizationModule } from './authz/authz.module';

const envFilePath = ['.env'];
if (process.env.NODE_ENV === 'production') {
  envFilePath.unshift('.env.production');
} else {
  envFilePath.unshift('.env.development');
}

@Dependencies(DataSource)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          db: configService.get<number>('REDIS_DB', 0),
          ttl: configService.get<number>('REDIS_TTL', 600),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST', 'localhost'),
          port: configService.get<number>('MYSQL_PORT', 3306),
          username: configService.get<string>('MYSQL_USER', 'root'),
          password: configService.get<string>('MYSQL_PASS', 'root123456'),
          database: configService.get<string>('MYSQL_DB', 'nest_template'),
          timezone: '+08:00',
          autoLoadEntities: true,
          synchronize: true, // 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是
        };
      },
    }),
    AuthZModule.register({
      imports: [ConfigModule],
      enforcerProvider: {
        provide: AUTHZ_ENFORCER,
        useFactory: async (configService: ConfigService) => {
          const policy = await TypeORMAdapter.newAdapter({
            type: 'mysql',
            host: configService.get<string>('MYSQL_HOST', 'localhost'),
            port: configService.get<number>('MYSQL_PORT', 3306),
            username: configService.get<string>('MYSQL_USER', 'root'),
            password: configService.get<string>('MYSQL_PASS', 'root123456'),
            database: configService.get<string>('MYSQL_DB', 'nest_template'),
          });
          return casbin.newEnforcer('src/config/casbin/model.conf', policy);
        },
        inject: [ConfigService],
      },
      userFromContext: (ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return (
          request.user && {
            username: request.user.name,
          }
        );
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:yyyy-mm-dd, HH:MM:ss TT Z',
          },
        },
        level: (() => {
          const logLevel = {
            production: 'info',
            development: 'debug',
            test: 'error',
          };

          return logLevel[process.env.NODE_ENV] || 'info';
        })(),
        autoLogging: false,
        redact: ['req.headers.authorization'],
      },
    }),
    HealthModule,
    AuthModule,
    UsersModule,
    ToolModule,
    AuthorizationModule,
  ],
  controllers: [AppController, ToolController],
  providers: [AppService, ToolService],
})
export class AppModule {}
