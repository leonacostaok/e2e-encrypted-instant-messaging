import { Router } from 'express'
import { privacyValidator, updateInformationUserValidator } from '../middlewares/user.middleware'
import {
  getUserController,
  deleteUserController,
  updatePrivacyUserController,
  updateInformationUserController,
  privacyController
} from '../controllers/user.controllers'
import { wrapRequestHandler } from '../utils/handler.utils'

const userRouter = Router()
userRouter.get('/:id', wrapRequestHandler(getUserController))
userRouter.patch('/update-user', updateInformationUserValidator, wrapRequestHandler(updateInformationUserController))
userRouter.delete('/delete-user', wrapRequestHandler(deleteUserController))
userRouter.post('/privacy', privacyValidator, wrapRequestHandler(updatePrivacyUserController))
userRouter.get('/privacy/:id', wrapRequestHandler(privacyController))
export default userRouter
