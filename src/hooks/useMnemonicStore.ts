import * as bip39 from 'bip39'
import {createStore, KeysData} from 'key-store'
import {useEffect, useMemo, useState} from 'react'

const MNEMONIC_STORE_PATH = 'mnemonic-store'

export function useMnemonicStore() {
    const [keyStore, setMnemonicStore] = useState<KeysData<{}> | undefined>(undefined)

    useEffect(() => {
        const mnemonicStoreString = localStorage.getItem(MNEMONIC_STORE_PATH)
        setMnemonicStore(mnemonicStoreString ? JSON.parse(mnemonicStoreString) : undefined)
    }, [])

    const createFileStore = async () => {
        const saveKeys = (data: KeysData<{}>): void => {
            localStorage.setItem(MNEMONIC_STORE_PATH, JSON.stringify(data))
            setMnemonicStore(data)
        }

        return createStore<string>(saveKeys, keyStore)
    }

    const initializeMnemonic = async (id: string, password: string, mnemonic?: string) => {
        if (!mnemonic) mnemonic = bip39.generateMnemonic(128)
        const fileStore = await createFileStore()
        await fileStore.saveKey(id, password, mnemonic)
        return mnemonic
    }

    const decryptMnemonic = async (id: string, password: string) => {
        const fileStore = await createFileStore()
        return fileStore.getPrivateKeyData(id, password)
    }

    const mnemonicStoreExists = useMemo(() => !!keyStore, [keyStore])

    return {initializeMnemonic, decryptMnemonic, mnemonicStoreExists}
}
