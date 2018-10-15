import Sequelize from 'sequelize'
import UserModel from './models/User'
import TextModel from './models/Text'
import RoleModel, { actions } from './models/Role'
import config from './config'

export const sequelize = new Sequelize(
  config.dbName,
  config.dbUsername,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mssql',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

export const User = UserModel(sequelize, Sequelize)
export const Text = TextModel(sequelize, Sequelize)
export const Role = RoleModel(sequelize, Sequelize)

// const models = { User, Text, Role }

export const associate = () => {
  User.belongsTo(Role, { foreignKey: 'roleCode', targetKey: 'code' })
  Role.hasMany(User, { foreignKey: 'roleCode', sourceKey: 'code' })

  sequelize.sync().then(async () => {
    // Object.keys(models).forEach(
    //   key => models[key].associate && models[key].associate(models)
    // )
    await Role.create({
      code: 'user',
      textPermissions: 'y'
    })
    await Role.create({
      code: 'admin',
      textPermissions: 'x'
      // actions.READ,
      // actions.CREATE,
      // actions.UPDATE,
      // actions.DELETE
    })

    const newUser = User.build({
      username: 'user',
      roleCode: 'admin'
    })
    await newUser.setPassword('Aaa123+')
    await newUser.save()
  })
}
