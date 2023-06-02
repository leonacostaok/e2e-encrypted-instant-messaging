export interface User {
  id: number
  publicKey: string
  alias: string | null
  phoneNumber: string | null
  name: string | null
  emoji: string | null
  status: string | null
  image: string | null
  createdAt: Date
  updateAt: Date
}
