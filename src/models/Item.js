export default (sequelize, Sequelize) => {
  const Item = sequelize.define('item', {
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  })

  Item.sync()

  return Item
}
