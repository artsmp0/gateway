import { getConfig } from '@/utils';

const {
  FEISHU_CONFIG: { FEISHU_APP_ID, FEISHU_APP_SECRET },
} = getConfig();

export { FEISHU_APP_ID as APP_ID, FEISHU_APP_SECRET as APP_SECRET };
