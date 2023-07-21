import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)
    // Không có lỗi thì next tiếp tục request
    if (errors.isEmpty()) {
      return next()
    }

    //Map các lỗi của một trường được check lại vói nhau
    // không tách riêng bắt từng lỗi như ta dùng errors.array
    res.status(400).json({ errors: errors.mapped() })
  }
}
