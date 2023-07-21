import { Request } from 'express'

import * as fs from 'fs'
import * as path from 'path'
import { File } from 'formidable'
import HTTP_STATUS_ME from '../constants/httpStatus'
//tao thu muc upload tu dong
export const initFolder = () => {
  const uploadFolder = path.resolve('/upload/images')
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(path.resolve(uploadFolder), {
      recursive: true // create folder nested image
    })
  }
}

export const handleUploadImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('upload/images'), //mac dinh luu vao thu muc tam tren may
    maxFiles: 4, //max file upload
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5Mb
    maxTotalFileSize: 20 * 1024 * 1024, // 20Mb
    filter: function ({ mimetype }) {
      // keep only images
      let cancelUploads = false
      const valid = mimetype && mimetype.includes('image')
      if (!valid) {
        form.emit('error' as any, new Error('Type is invalid') as any) // optional make form.parse error
        cancelUploads = true //variable to make filter return false after the first problem
      }
      return valid && !cancelUploads
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ message: 'Type is invalid', status: HTTP_STATUS_ME.INTERNAL_SERVER_ERROR })
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean('image' in files) || !files) {
        reject({ message: 'File is empty', status: HTTP_STATUS_ME.INTERNAL_SERVER_ERROR })
      }
      resolve(files.image as File[])
    })
  })
  //upload single image
  // return new Promise<File>((resolve, reject) => {
  //   form.parse(req, (err, fields, files) => {
  //     if (err) {
  //       return reject(err)
  //     }
  //     // eslint-disable-next-line no-extra-boolean-cast
  //     if (!Boolean('image' in files)) {
  //       return reject(new Error('File is empty'))
  //     }
  //     resolve((files.image as File[])[0])
  //   })
  // })
}

export const getNameFromFullName = (fullName: string) => {
  const nameArr = fullName.split('.')
  nameArr.pop()
  return nameArr.join('')
}
