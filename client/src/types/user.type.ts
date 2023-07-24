export interface UserType {
  id: number
  publicKey: string
  alias?: string
  phoneNumber?: string
  name?: string
  emoji?: string
  status?: string
  image?: string
  createAt?: Date
  updateAt?: Date
}

export interface PrivacyType{
  id: number
  userId: number
  autoAcceptContacts: boolean
  phoneSearch: boolean
  aliasSearch: boolean
  phoneShare: string
  emojiShare: string
  nameShare: string
  imageShare: string
  statusShare: string
}
