import { BusinessException } from '@/common/exceptions/business.exception';
import { getAppToken } from '@/helper/feishu/auth';
import { messages } from '@/helper/feishu/func';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
  }

  async getAppToken() {
    let appToken: string;
    try {
      appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
      if (!appToken) {
        const res = await getAppToken();
        if (res.code !== 0) {
          throw new BusinessException('飞书调用异常！');
        }
        appToken = res.app_access_token;
        this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          appToken,
          res.expire - 60,
        );
      }
    } catch (error) {
      console.log('error: ', error);
    }
    return appToken;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    return messages(receive_id_type, params, app_token as string);
  }
}
