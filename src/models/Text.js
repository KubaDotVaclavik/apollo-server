export default (sequelize, Sequelize) => {
  const TextSchema = sequelize.define('text', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    text_cs: {
      type: Sequelize.TEXT,
      defaultValue: 'text_cs'
    },
    text_en: {
      type: Sequelize.TEXT,
      defaultValue: 'text_en'
    },
    text_svk: {
      type: Sequelize.TEXT,
      defaultValue: 'text_svk'
    },
    text_blr: {
      type: Sequelize.TEXT,
      defaultValue: 'text_blr'
    },
    poznamka: {
      type: Sequelize.TEXT
    }
  })

  TextSchema.sync({ force: true })

  return TextSchema
}
