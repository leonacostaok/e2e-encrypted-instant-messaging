import { createStore, KeysData } from "key-store";
import HDNode from "hdkey";
import * as bip39 from 'bip39'
import { useCookies } from "react-cookie";
import { useMemo } from "react";

export function useKeyStore() {
  const [cookie, setCookie] = useCookies(['key-store'])

  const keyStoreExists = useMemo(() => !!cookie["key-store"], [cookie])
  const createFileStore = async () => {
    const saveKeys = async (data: KeysData<{}>): Promise<void> => {
      setCookie('key-store', JSON.stringify(data));
    };

    const readKeys = async () => {
      return cookie["key-store"] ?? {};
    };

    return createStore<{ xpriv: string; xpub: string } | string>(
      saveKeys,
      await readKeys(),
    );
  };

  const initializeKey = async (
    id: string,
    password: string,
  ) => {
    const mnemonic = await bip39.generateMnemonic(128);
    const keyPair = HDNode.fromMasterSeed(await bip39.mnemonicToSeed(mnemonic));
    const fileStore = await createFileStore();
    await fileStore.saveKey(id, password, keyPair.toJSON());
    await fileStore.saveKey(id+'-mnemonic', password, mnemonic);
    return { mnemonic, keyPair };
  };

  const decryptKey = async (id: string, password: string) => {
    const fileStore = await createFileStore();
    const keyPairInformation = fileStore.getPrivateKeyData(id, password) as { xpriv: string; xpub: string };
    const mnemonicInformation = fileStore.getPrivateKeyData(id+'-mnemonic', password) as string;
    return { hdKey: HDNode.fromJSON(keyPairInformation), mnemonic: mnemonicInformation };
  };

  const recoverKey = async (id: string, mnemonic: string, password: string) => {
    const keyPair = HDNode.fromMasterSeed(await bip39.mnemonicToSeed(mnemonic));
    const fileStore = await createFileStore();
    await fileStore.saveKey(id, password, keyPair.toJSON());
    return keyPair;
  };

  return { initializeKey, decryptKey, keyStoreExists, recoverKey }
}
