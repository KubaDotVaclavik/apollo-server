import { Text } from '../../sequelize'

export schema from './schema.graphql'

export const resolvers = {
  Query: {
    texts() {
      return Text.findAll()
    }
  },

  Mutation: {
    textCreate(_, args, ctx) {
      return Text.create(args.input)
    }
  }
}
