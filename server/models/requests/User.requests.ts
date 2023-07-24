import { PrivacyType } from '../schemas/Privacy.schema'

export interface UpdateUserReqBody {
  id: number
  alias?: string
  name?: string
  image?: string
  phoneNumber?: string
  status?: string
}
export type ShareType = 'NONE' | 'CONTACTS' | 'EVERYONE'
export type PrivacyUserReqBody = PrivacyType
