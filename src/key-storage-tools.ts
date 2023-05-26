import { writeFileSync, existsSync, readFileSync } from 'fs';
import { createStore, KeysData } from 'key-store';
import settings from './settings';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HDNode = require('hdkey');

export const createFileStore = async (filePath: string) => {
  const saveKeys = async (data: KeysData<never>): Promise<void> => {
    writeFileSync(filePath, JSON.stringify(data));
  };

  const readKeys = async () => {
    return existsSync(filePath)
      ? JSON.parse(readFileSync(filePath, 'utf8'))
      : {};
  };

  return createStore<{ xpriv: string; xpub: string }>(
    saveKeys,
    await readKeys(),
  );
};

export const initializeKey = async (
  id: string,
  seed: string,
  password: string,
) => {
  const keyPair = HDNode.fromMasterSeed(Buffer.from(seed, 'hex'));
  const fileStore = await createFileStore(settings.keyPath);
  await fileStore.saveKey(id, password, keyPair.toJSON());
  return keyPair;
};

export const recoverKey = async (id: string, password: string) => {
  const fileStore = await createFileStore(settings.keyPath);
  const keyPairInformation = fileStore.getPrivateKeyData(id, password);
  return HDNode.fromJSON(keyPairInformation);
};
