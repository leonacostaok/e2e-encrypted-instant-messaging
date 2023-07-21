import prisma from '../common/prisma.service'
import { PrivacyUserReqBody, UpdateUserReqBody } from '../models/requests/User.requests'
import Privacy from '../models/schemas/Privacy.schema'

class UsersServices {
  async updateUser(userRequest: UpdateUserReqBody) {
    const { id } = userRequest
    const where = {
      AND: [
        {
          id: id
        }
      ]
    }
    try {
      const userCheck = await prisma.user.findFirst({
        where
      })
      if (!userCheck) {
        return
      }
      return await prisma.user.update({
        where: { id },
        data: {
          ...userRequest
        }
      })
    } catch (error: unknown) {
      console.log('User Update Error ', error)
    }
  }
  async checkAliasExist(alias: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { alias },
      select: { alias: true }
    })
    return Boolean(user)
  }
  async deleteUser(id: number) {
    const condition = {
      AND: [
        {
          id: id
        }
      ]
    }
    try {
      const userCheck = await prisma.user.findFirst({
        where: condition
      })
      if (!userCheck) {
        return
      }
      return await prisma.user.delete({
        where: { id }
      })
    } catch (error: unknown) {
      console.log('User Delete Error ', error)
    }
  }

  async updatePrivacyUser(privacy: PrivacyUserReqBody) {
    const { userId } = privacy
    try {
      const privacyQuery = await prisma.user.findFirst({
        where: {
          id: userId
        }
      })
      if (!privacyQuery) {
        return
      }
      return prisma.privacySettings.upsert({
        where: {
          userId: userId
        },
        create: new Privacy({ ...privacy }),
        update: new Privacy({ ...privacy })
      })
    } catch (error: unknown) {
      console.log('Update Privacy Error', error)
    }
  }
}

const usersService = new UsersServices()
export default usersService
