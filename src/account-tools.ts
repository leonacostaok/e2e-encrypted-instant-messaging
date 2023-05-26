import settings from './settings';
import { initializeKey, recoverKey } from './key-storage-tools';

export const initializeAccount = async (seed: string, password: string) => {
  return initializeKey(settings.account.keyId, seed, password);
};

export const getAccount = async (password: string) => {
  return recoverKey(settings.account.keyId, password);
};
