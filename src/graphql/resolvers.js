export default {
  Query: {
    items() {
      return Item.findAll()
    }
  },

  Mutation: {
    async itemCreate(_, args, ctx) {
      const newItem = await Item.create(args.input)

      return newItem
    }
  }
}
