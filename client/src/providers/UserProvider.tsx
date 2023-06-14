import * as bip39 from 'bip39'
import HDNode from 'hdkey'
import { createContext, useState } from 'react'

import { settings } from '../constants/settings'
import { useKeyStore } from '../hooks/useKeyStore'

export interface UserState {
  keyStoreExists: boolean
  keyPair: HDNode | undefined
  isBackupConfirmed: boolean
  loginWithPassword: (password: string) => Promise<{ result: boolean; mnemonic?: string }>
  loginWithMnemonicAndPassword: (mnemonic: string, password: string) => Promise<boolean>
  error: string | undefined
  resetError: () => void
  confirmBackup: () => void
}

export const userProviderContext = createContext<UserState>({
  isBackupConfirmed: false,
  loginWithPassword: async (password: string) => {
    return { result: false }
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
  keyPair: undefined,
  keyStoreExists: false,
  error: undefined
})

const UserProvider = ({ children }: { children: any }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [keyPair, setKeyPair] = useState<HDNode | undefined>(undefined)
  const { initializeKey, decryptKey, keyStoreExists } = useKeyStore()
  const [isBackupConfirmed, setIsBackupConfirmed] = useState(false)

  const loginWithPassword = async (password: string) => {
    if (password !== '') {
      if (keyStoreExists) {
        try {
          const { hdKey, mnemonic } = await decryptKey(settings.userKeyId, password)
          setKeyPair(hdKey)
          setIsBackupConfirmed(Boolean(localStorage.getItem('backupConfirmed')))
          return { result: true, mnemonic }
        } catch (e: any) {
          setError(e.message + (e.message.includes('Decryption failed.') ? ' Try with a different password.' : ''))
        }
      } else {
        const { keyPair, mnemonic } = await initializeKey(settings.userKeyId, password)
        setKeyPair(keyPair)
        setIsBackupConfirmed(false)
        localStorage.setItem('backupConfirmed', 'false')
        return { result: true, mnemonic }
      }
    } else {
      setError('Password must be filled up.')
    }
    return { result: false }
  }

  const loginWithMnemonicAndPassword = async (mnemonic: string, password: string) => {
    if (mnemonic !== '' && password !== '') {
      if (bip39.validateMnemonic(mnemonic)) {
        try {
          const { keyPair } = await initializeKey(settings.userKeyId, password, mnemonic)
          setKeyPair(keyPair)
          setIsBackupConfirmed(true)
          localStorage.setItem('backupConfirmed', 'true')
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
    localStorage.setItem('backupConfirmed', 'true')
    setIsBackupConfirmed(true)
  }

  return (
    <userProviderContext.Provider
      value={{
        isBackupConfirmed,
        confirmBackup,
        error,
        loginWithPassword,
        keyPair,
        keyStoreExists,
        loginWithMnemonicAndPassword,
        resetError
      }}>
      {children}
    </userProviderContext.Provider>
  )
}

export default UserProvider
