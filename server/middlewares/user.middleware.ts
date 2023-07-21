import { ParamSchema, checkSchema } from 'express-validator'
import usersService from '../services/user.services'
import { validate } from '../utils/validation'
import { ShareTypeEnum } from '../constants/shareTypeEnum'
const checkType = (type: any) => {
  return Object.values(ShareTypeEnum).find((valueType) => valueType === type)
}
const nameUser: ParamSchema = {
  notEmpty: undefined,
  optional: true,
  trim: true,
  isString: {
    errorMessage: 'Name must be a string'
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: 'Name length must be from 6 to 50 character'
  }
}
const aliasUser: ParamSchema = {
  notEmpty: undefined,
  optional: true,
  trim: true,
  isString: {
    errorMessage: 'Alias must be a string'
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: 'Alias length must be from 6 to 50 character'
  },
  matches: {
    options: [/^[a-zA-Z0-9_-]*$/],
    errorMessage: 'Alias can contain only letters and numbers or underscore'
  },
  custom: {
    options: async (value) => {
      const isExistAlias = await usersService.checkAliasExist(value)
      if (isExistAlias) {
        throw new Error('Alias already exists')
      }
      return true
    }
  }
}
export const updateInformationUserValidator = validate(
  checkSchema(
    {
      name: nameUser,
      alias: aliasUser,
      phoneNumber: {
        notEmpty: undefined,
        optional: true,
        trim: true,
        isMobilePhone: {
          errorMessage: 'Phone is invalid'
        }
      }
    },
    ['body']
  )
)
export const privacyValidator = validate(
  checkSchema(
    {
      autoAcceptContacts: {
        optional: true,
        isBoolean: {
          errorMessage: 'Auto accept contacts is valid'
        }
      },
      phoneSearch: {
        optional: true,
        isBoolean: {
          errorMessage: 'Phone search is valid'
        }
      },
      aliasSearch: {
        optional: true,
        isBoolean: {
          errorMessage: 'Alias search is valid'
        }
      },
      phoneShare: {
        optional: true,
        custom: {
          options: (value) => {
            const checkShareType = checkType(value)
            if (!checkShareType) {
              throw new Error('Phone share is valid')
            }
            return true
          }
        }
      },
      emojiShare: {
        optional: true,
        custom: {
          options: (value) => {
            const checkShareType = checkType(value)
            if (!checkShareType) {
              throw new Error('Emoji share is valid')
            }
            return true
          }
        }
      },
      nameShare: {
        optional: true,
        custom: {
          options: (value) => {
            const checkShareType = checkType(value)
            if (!checkShareType) {
              throw new Error('Name share is valid')
            }
            return true
          }
        }
      },
      imageShare: {
        optional: true,
        custom: {
          options: (value) => {
            const checkShareType = checkType(value)
            if (!checkShareType) {
              throw new Error('Image share is valid')
            }
            return true
          }
        }
      },
      statusShare: {
        optional: true,
        custom: {
          options: (value) => {
            const checkShareType = checkType(value)
            if (!checkShareType) {
              throw new Error('Status share is valid')
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
