import { ShareType } from '../requests/User.requests'
import { ShareTypeEnum } from '../../constants/shareTypeEnum'

export interface PrivacyType {
  userId: number
  autoAcceptContacts?: boolean
  phoneSearch?: boolean
  aliasSearch?: boolean
  phoneShare?: ShareType
  emojiShare?: ShareType
  nameShare?: ShareType
  imageShare?: ShareType
  statusShare?: ShareType
}
export default class Privacy {
  userId: number
  autoAcceptContacts: boolean
  phoneSearch: boolean
  aliasSearch: boolean
  phoneShare: ShareType
  emojiShare: ShareType
  nameShare: ShareType
  imageShare: ShareType
  statusShare: ShareType
  constructor(privacy: PrivacyType) {
    this.userId = privacy.userId
    this.autoAcceptContacts = privacy.autoAcceptContacts ?? true
    this.phoneSearch = privacy.phoneSearch ?? true
    this.aliasSearch = privacy.aliasSearch ?? true
    this.phoneShare = privacy.phoneShare ?? ShareTypeEnum.CONTACTS
    this.emojiShare = privacy.emojiShare ?? ShareTypeEnum.CONTACTS
    this.nameShare = privacy.nameShare ?? ShareTypeEnum.CONTACTS
    this.imageShare = privacy.imageShare ?? ShareTypeEnum.CONTACTS
    this.statusShare = privacy.statusShare ?? ShareTypeEnum.CONTACTS
  }
}
