# nest-template

## 描述

根据 nestjs 添加开发常用的库及配置，为日常开发提供拿来就用的 nestjs 模版，实际开发可按文档摘除无需使用的功能。

## 起步

### 安装依赖  
  ```shell
  $ npm install
  ```

### 启动项目

#### 开发环境  
  ```shell
  $ npm run start:dev 
  ```

#### 生产环境
  ```shell
  $ npm run build
  $ npm run start:prod 
  ```

## 项目配置
- [健康检查](#health)
- [登录授权](#auth)
- [持久层](#store)
- [缓存层](#cache)
- [异常过滤](#filter)
- [响应拦截](#interceptor)
- [`Api` 文档](#doc)
- [日志](#logger)
- [常用工具](#tools)
- [文件管理](#files)
- [权限系统](#auth)
- [管理系统](#admin)

### <a name="health"></a> 健康检查
健康检查是完全按照 nestjs 官方方案实现，可根据[官方文档](!https://docs.nestjs.com/recipes/terminus)进行删改


### <a name="auth"></a> 登录授权
采用 `jwt` + `redis` 的方案实现登录授权

- [ ] 飞书登录
- [ ] 微信登录
- [ ] 钉钉登录
  
使用 `cookies` + `jwt` + `token` 的方式实现单点登录。  

### <a name="store"></a> 持久层
`mysql2` + `typeorm`


### <a name="cache"></a> 缓存层
  依赖于 `nestjs` 的 [Cache](https://docs.nestjs.com/techniques/caching) 包
  - `@nestjs/cache-manager@^2.1.1`
  - `cache-manager@^5.2.4`  

  使用 `redis` 实现，需要配合以下依赖包使用
  -  `cache-manager-redis-store@^3.0.1`  
  - `redis@3.1.2`
  
  限制于 `nestjs` 官方包 `cache-manager-redis-store@^3.0.1` 的原因，注意以下几点。
  - 限制版本 `redis@3.1.2`
  - ttl 为毫秒

  ```ts
  // 使用示例
  import { Inject, Injectable } from '@nestjs/common';
  import { CACHE_MANAGER } from '@nestjs/cache-manager';
  import { Cache } from 'cache-manager';

  @Injectable()
  export class AuthService {
    constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async demo(): Promise<any> {

      await this.cacheManager.set(
        token,
        payload,
        7 * 24 * 60 * 60 * 1000, // 7 day
      );

      return {}
  }
  ```

### <a name="filter"></a> 异常过滤
  处理异常状态

### <a name="interceptor"></a> 响应拦截
  返回统一请求体

### <a name="doc"></a> `Api` 文档
使用 swagger 实现 api 文档。

### <a name="logger"></a> 日志  

日志是完全按照 nestjs 官方方案实现，可根据[官方文档](!https://docs.nestjs.com/techniques/logger)进行删改

### <a name="tools"></a> 常用工具
- [ ] 发送验证码
- [ ] 发送邮件
- [x] 网页、模板生成图片

### <a name="files"></a> 文件管理  
- [ ] 文件处理  
- [ ] 腾讯云
- [ ] 阿里云

### <a name="auth"></a> 权限系统
使用泛用性更广的 ABAC 权限模型，权限颗粒度更细。

### <a name="admin"></a> 管理系统
配套前端，方便查看系统日志、权限、数据及配置。
