import { Module } from '@nestjs/common';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FeishuController, UserController],
  providers: [FeishuService, UserService, ...UserProviders],
})
export class UserModule {}
