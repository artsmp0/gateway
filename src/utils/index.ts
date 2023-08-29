import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

export const getConfig = () => {
  const env = getEnv();
  const yamlPath = join(process.cwd(), `./.config/.${env}.yaml`);
  const file = readFileSync(yamlPath, 'utf-8');
  const config = parse(file);
  return config;
};
