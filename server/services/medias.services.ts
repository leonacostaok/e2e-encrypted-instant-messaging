import { Request } from 'express'
import * as path from 'path'

import { getNameFromFullName, handleUploadImage } from '../utils/file.utils'
import sharp = require('sharp')
//import * as fs from 'fs'

class MediasServices {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result = Promise.all(
      files.map(async (file) => {
        const { mimetype, newFilename, filepath } = file
        const checkTypeGif = mimetype === 'image/gif'
        const newName = getNameFromFullName(newFilename)
        const newNameExtension = checkTypeGif ? `${newName}.gif` : `${newName}.jpg`
        const newPath = path.resolve(path.resolve('upload/temp'), newNameExtension)
        if (checkTypeGif) {
          await sharp(filepath, { animated: true }).gif().toFile(newPath)
        } else {
          await sharp(filepath).jpeg().toFile(newPath)
        }
        //fs.unlinkSync(filepath)
        return `localhost:9876/medias/${newNameExtension}`
      })
    )
    return result
  }
}

const mediasService = new MediasServices()
export default mediasService
