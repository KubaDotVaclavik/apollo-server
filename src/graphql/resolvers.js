import { models } from '../sequelize'

export default {
  Query: {
    items() {
      return models.Item.findAll()
    }
  },

  Mutation: {
    async itemCreate(_, args, ctx) {
      const newItem = await models.Item.create(args.input)

      return newItem
    }
  }
}
