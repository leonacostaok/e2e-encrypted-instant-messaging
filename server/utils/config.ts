import * as fs from 'fs';
import { merge } from 'lodash';

export const config = () => {
  const { NODE_ENV, PORT: APP_PORT } = process.env;

  const confDefault = JSON.parse(
    fs.readFileSync(`${__dirname}/../../../config/index.json`, 'utf-8'),
  );

  const conf = JSON.parse(
    fs.readFileSync(`${__dirname}/../../../config/${NODE_ENV}.json`, 'utf-8'),
  );

  const jsonConfig = merge(confDefault, conf, {
    nullOverride: true,
    mergeArrays: true,
  });

  return {
    ...jsonConfig,
    NODE_ENV,
    APP_PORT,
  };
};

export default config;
