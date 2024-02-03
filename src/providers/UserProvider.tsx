import * as bip39 from 'bip39'
import {createContext, useState} from 'react'

import {settings} from '../constants/settings'
import {useMnemonicStore} from '../hooks/useMnemonicStore'
import {ClientSigner, Metadata, Client, Keys, loadWasmAsync} from "@rust-nostr/nostr-sdk";

export interface UserState {
    mnemonicStoreExists: boolean
    isBackupConfirmed: boolean
    loginWithPassword: (password: string) => Promise<{ result: boolean; mnemonic?: string }>
    loginWithMnemonicAndPassword: (mnemonic: string, password: string) => Promise<boolean>
    error: string | undefined
    resetError: () => void
    confirmBackup: () => void
    client: Client | undefined
    keys: Keys | undefined
}

export const userProviderContext = createContext<UserState>({
    isBackupConfirmed: false,
    loginWithPassword: async (password: string) => {
        return {result: false}
    },
    loginWithMnemonicAndPassword: async (mnemonic: string, password: string) => {
        return false
    },
    resetError: () => {
        return
    },
    confirmBackup: () => {
        return
    },
    mnemonicStoreExists: false,
    error: undefined,
    client: undefined,
    keys: undefined
})

const UserProvider = ({children}: { children: any }) => {
    const [error, setError] = useState<string | undefined>(undefined)
    const [client, setClient] = useState<Client | undefined>()
    const [keys, setKeys] = useState<Keys | undefined>()
    const {initializeMnemonic, decryptMnemonic, mnemonicStoreExists} = useMnemonicStore()
    const [isBackupConfirmed, setIsBackupConfirmed] = useState(false)

    const connect = async (keys: Keys) => {
        let signer = ClientSigner.keys(keys);
        let client = new Client(signer);
        await client.addRelay("wss://relay.damus.io");
        await client.addRelay("wss://nos.lol");
        await client.addRelay("wss://nostr.oxtr.dev");

        await client.connect();

        let metadata = new Metadata()
            .name("CharlesRobert")
            .displayName("Charles")
            .about("Robert")
            .nip05("leon@dandelionlabs.io")
            .lud16("yuki@getalby.com");

        await client.setMetadata(metadata);
        setClient(client)

    }

    const loginWithPassword = async (password: string) => {
        if (password !== '') {
            await loadWasmAsync();
            if (mnemonicStoreExists) {
                try {
                    const mnemonic = await decryptMnemonic(settings.userKeyId, password)
                    setIsBackupConfirmed(Boolean(localStorage.getItem('backup-confirmed')))
                    console.log('loginWithPassword: mnemonic', mnemonic)
                    const keys = Keys.fromMnemonic(mnemonic)
                    await connect(keys)
                    setKeys(keys)
                    return {result: true}
                } catch (e: any) {
                    console.log(e)
                    setError(e.message + (e.message.includes('Decryption failed.') ? ' Try with a different password.' : ''))
                }
            } else {
                const mnemonic = await initializeMnemonic(settings.userKeyId, password)
                console.log('loginWithPassword::else:', mnemonic)
                setIsBackupConfirmed(false)
                const keys = Keys.fromMnemonic(mnemonic)
                await connect(keys)
                setKeys(keys)
                localStorage.setItem('backup-confirmed', 'false')
                return {result: true, mnemonic}
            }
        } else {
            setError('Password must be filled up.')
        }
        return {result: false}
    }

    const loginWithMnemonicAndPassword = async (mnemonic: string, password: string) => {
        if (mnemonic !== '' && password !== '') {
            await loadWasmAsync();
            if (bip39.validateMnemonic(mnemonic)) {
                try {
                    await initializeMnemonic(settings.userKeyId, password, mnemonic)
                    setIsBackupConfirmed(true)
                    const keys = Keys.fromMnemonic(mnemonic)
                    await connect(keys)
                    setKeys(keys)
                    localStorage.setItem('backup-confirmed', 'true')
                    return true
                } catch (e: any) {
                    setError(e.message)
                }
            } else {
                setError('Mnemonic not valid, please check if the 12 words coincide with your backup.')
            }
        } else {
            setError('Both mnemonic and password must have values.')
        }
        return false
    }

    const resetError = () => {
        setError('')
    }

    const confirmBackup = () => {
        localStorage.setItem('backup-confirmed', 'true')
        setIsBackupConfirmed(true)
    }

    return (
        <userProviderContext.Provider
            value={{
                isBackupConfirmed,
                confirmBackup,
                error,
                loginWithPassword,
                client,
                keys,
                mnemonicStoreExists,
                loginWithMnemonicAndPassword,
                resetError
            }}>
            {children}
        </userProviderContext.Provider>
    )
}

export default UserProvider
