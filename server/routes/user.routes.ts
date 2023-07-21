import { Router } from 'express'
import { privacyValidator, updateInformationUserValidator } from '../middlewares/user.middleware'
import {
  deleteUserController,
  privacyUserController,
  updateInformationUserController
} from '../controllers/user.controllers'
import { wrapRequestHandler } from '../utils/handler.utils'

const userRouter = Router()
userRouter.patch('/update-user', updateInformationUserValidator, wrapRequestHandler(updateInformationUserController))
userRouter.delete('/delete-user', wrapRequestHandler(deleteUserController))
userRouter.post('/privacy', privacyValidator, wrapRequestHandler(privacyUserController))
export default userRouter
