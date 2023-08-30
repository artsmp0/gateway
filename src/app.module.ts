import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  /** imports 对应的 module 之后，就可以使用这个 module exports 出来的内容 */
  imports: [
    /** 表示这是一个动态模块
     * register：用一次模块传一次配置，比如这次调用是 BbbModule.register({aaa:1})，下一次就是 BbbModule.register({aaa:2}) 了
     * forRoot：配置一次模块用多次，比如 XxxModule.forRoot({}) 一次，之后就一直用这个 Module，一般在 AppModule 里 import
     * forFeature：用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。
     */
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  /** provider 是表示这个模块下的所有成员可以使用什么东西，只有在这里提供的东西才可以在 controller 里注入
   * 东西包含值、类等。
   */
  providers: [AppService],
})
export class AppModule {}
