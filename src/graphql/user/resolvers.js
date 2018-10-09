import { User, Role } from '../../sequelize'

export schema from './schema.graphql'

export const resolvers = {
  Query: {
    viewer(root, args, ctx) {
      return ctx.user
    },
    async users() {
      const users = await User.findAll({
        include: [
          {
            model: Role
          }
        ]
      })
      return users
    }
  }
}
