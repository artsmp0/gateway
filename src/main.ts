import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';
import fastify from 'fastify';
import { FastifyLogger } from './common/logger';
/*
Fastify 在 QPS（并发请求处理） 的的效率远高于其他框架
 */
async function bootstrap() {
  const fastifyInstance: any = fastify({
    logger: FastifyLogger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion: '1',
    // defaultVersion: [VERSION_NEUTRAL, '1', '2'],
  });

  app.useGlobalInterceptors(new TransformInterceptor());

  // 注意引入顺序
  app.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  // 添加文档
  generateDocument(app);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();

declare const module: any;
