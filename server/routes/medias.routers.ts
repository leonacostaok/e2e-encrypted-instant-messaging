import { Router } from 'express'
import { uploadImageController } from '../controllers/medias.controller'
import { wrapRequestHandler } from '../utils/handler.utils'
const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapRequestHandler(uploadImageController))
export default mediasRouter
