import { createStore, KeysData } from "key-store";
import HDNode from "hdkey";
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
      return cookie["key-store"]
        ? JSON.parse(cookie["key-store"])
        : {};
    };

    return createStore<{ xpriv: string; xpub: string }>(
      saveKeys,
      await readKeys(),
    );
  };

  const initializeKey = async (
    id: string,
    seed: string,
    password: string,
  ) => {
    const keyPair = HDNode.fromMasterSeed(Buffer.from(seed, 'hex'));
    const fileStore = await createFileStore();
    await fileStore.saveKey(id, password, keyPair.toJSON());
    return keyPair;
  };

  const recoverKey = async (id: string, password: string) => {
    const fileStore = await createFileStore();
    const keyPairInformation = fileStore.getPrivateKeyData(id, password);
    return HDNode.fromJSON(keyPairInformation);
  };

  return { initializeKey, recoverKey, keyStoreExists }
}
