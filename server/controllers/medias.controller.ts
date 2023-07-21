import { NextFunction, Request, Response } from 'express'
import mediasService from '../services/medias.services'
export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mediasService.uploadImage(req)
    return res.send({
      result
    })
  } catch (e) {
    return res.send(e)
  }
}
