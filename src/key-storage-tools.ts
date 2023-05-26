import util from 'util';
import fs from 'fs';
import { createStore, KeysData } from 'key-store';
import { createKeyPair, recoverKeyPair } from './encryption-tools';
import settings from './settings';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const createFileStore = async (filePath: string) => {
  const saveKeys = (data: KeysData<never>) =>
    writeFile(filePath, JSON.stringify(data), 'utf8');

  const readKeys = async () => JSON.parse(await readFile(filePath, 'utf8'));

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
  const keyPair = createKeyPair(seed);
  const fileStore = await createFileStore(settings.keyPath);
  await fileStore.saveKey(id, password, keyPair.toJSON());
  return keyPair;
};

export const recoverKey = async (id: string, password: string) => {
  const fileStore = await createFileStore(settings.keyPath);
  const keyPairInformation = fileStore.getPrivateKeyData(id, password);
  return recoverKeyPair(keyPairInformation);
};
