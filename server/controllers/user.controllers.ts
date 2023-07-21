import { Request, Response } from 'express'
import usersService from '../services/user.services'
import HTTP_STATUS_ME from '../constants/httpStatus'
import { ParamsDictionary } from 'express-serve-static-core'
import { UpdateUserReqBody } from '../models/requests/User.requests'
import { ErrorWithStatus } from '../models/Errors'
export const updateInformationUserController = async (
  req: Request<ParamsDictionary, any, UpdateUserReqBody>,
  res: Response
) => {
  const user = req.body
  try {
    const responseUpdate = await usersService.updateUser(user)
    return res.send({
      message: 'User updated successfully',
      user: responseUpdate,
      status: HTTP_STATUS_ME.OK
    })
  } catch (e: any) {
    return res.send(
      new ErrorWithStatus({
        message: "User isn't exist!",
        status: HTTP_STATUS_ME.NOT_FOUND
      })
    )
  }
}
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.body
  try {
    await usersService.deleteUser(id)
    return res.send({
      message: 'User deleted successfully',
      status: HTTP_STATUS_ME.OK
    })
  } catch (e: any) {
    return res.send(
      new ErrorWithStatus({
        message: "User isn't exist!",
        status: HTTP_STATUS_ME.NOT_FOUND
      })
    )
  }
}

export const privacyUserController = async (req: Request, res: Response) => {
  try {
    await usersService.updatePrivacyUser(req.body)
    return res.send({
      message: 'Privacy Updated successfully',
      status: HTTP_STATUS_ME.OK
    })
  } catch (e: any) {
    return res.send(
      new ErrorWithStatus({
        message: "User isn't exist!",
        status: HTTP_STATUS_ME.NOT_FOUND
      })
    )
  }
}
