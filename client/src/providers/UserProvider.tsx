import { createContext, useEffect, useState } from "react";
import { useKeyStore } from "../hooks/useKeyStore";
import { settings } from "../constants/settings";
import HDNode from "hdkey";

export interface UserState {
  keyStoreExists: boolean
  keyPair: HDNode | undefined
  setPassword: (password: string) => void
}

export const userProviderContext = createContext<UserState>({
  setPassword: (password: string) => {
    return;
  },
  keyPair: undefined,
  keyStoreExists: false
})

const UserProvider = ({ children }: { children: any }) => {
  const [password, setPassword] = useState('')
  const [keyPair, setKeyPair] = useState<HDNode | undefined>(undefined)
  const {initializeKey, recoverKey, keyStoreExists} = useKeyStore()

  useEffect(() =>{
    if (password !== '') {
      ;(async () => {
        if (keyStoreExists) {
          const keyPair = await recoverKey(settings.userKeyId, password)
          setKeyPair(keyPair);
          setPassword('');
        } else {
          const keyPair = await initializeKey(settings.userKeyId, 'changethis', password)
          setKeyPair(keyPair);
          setPassword('');
        }
      })()
    }
  }, [password, setPassword])

  return (
    <userProviderContext.Provider value={{ setPassword, keyPair, keyStoreExists }}>
      {children}
    </userProviderContext.Provider>
  )
}

export default UserProvider
