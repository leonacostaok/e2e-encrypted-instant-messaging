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
export default class User {
  id: number
  publicKey: string
  alias: string
  phoneNumber: string
  name: string
  emoji: string
  status: string
  image: string
  createAt: Date
  updateAt: Date
  constructor(user: UserType) {
    const date = new Date()
    this.id = user.id
    this.publicKey = user.publicKey
    this.alias = user.alias || ''
    this.phoneNumber = user.phoneNumber || ''
    this.name = user.name || ''
    this.emoji = user.emoji || ''
    this.status = user.status || ''
    this.image = user.image || ''
    this.createAt = user.createAt || date
    this.updateAt = user.updateAt || date
  }
}
