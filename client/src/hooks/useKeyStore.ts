import { createStore, KeysData } from "key-store";
import HDNode from "hdkey";
import * as bip39 from 'bip39'
import { useEffect, useMemo, useState } from "react";
import { AES } from "crypto-js";

export function useKeyStore() {
  const [keyStore, setKeyStore] = useState<KeysData<{}> | undefined>(undefined)

  useEffect(() => {
    const keyStoreString = localStorage.getItem('key-store')
    setKeyStore(keyStoreString ? JSON.parse(keyStoreString) : undefined)
  }, [])

  const createFileStore = async () => {
    const saveKeys =  (data: KeysData<{}>): void => {
      localStorage.setItem('key-store', JSON.stringify(data));
      setKeyStore(data)
    };

    return createStore<{ xpriv: string; xpub: string }>(saveKeys, keyStore);
  };

  const initializeKey = async (
    id: string,
    password: string,
    mnemonic?: string
  ) => {
    if (!mnemonic) mnemonic = await bip39.generateMnemonic(128);
    const keyPair = HDNode.fromMasterSeed(await bip39.mnemonicToSeed(mnemonic));
    const fileStore = await createFileStore();
    await fileStore.saveKey(id, password, keyPair.toJSON());
    localStorage.setItem('mnemonic', AES.encrypt(mnemonic, keyPair.publicExtendedKey).toString())
    return { mnemonic, keyPair };
  };

  const decryptKey = async (id: string, password: string) => {
    const fileStore = await createFileStore();
    const keyPairInformation = fileStore.getPrivateKeyData(id, password);
    const mnemonicInformation = AES.decrypt(localStorage.getItem('mnemonic') ?? '', keyPairInformation.xpriv).toString()
    return { hdKey: HDNode.fromJSON(keyPairInformation), mnemonic: mnemonicInformation };
  };

  const keyStoreExists = useMemo(() => !!keyStore, [keyStore])

  return { initializeKey, decryptKey, keyStoreExists }
}
