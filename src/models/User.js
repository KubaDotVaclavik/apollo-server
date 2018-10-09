import bcrypt from 'bcrypt-nodejs'

export default (sequelize, Sequelize) => {
  const UserSchema = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    hash: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    roleCode: {
      type: Sequelize.STRING
      // values: ['user', 'admin', 'superadmin']
    }
  })

  // UserSchema.associate = function({ User }) {
  //   this.hasMany(User, { as: 'papers' })
  //   Player.belongsTo(Team)
  //   // this.hasMany(User, { foreignKey: 'roleCode' })
  //   // this.belongsToMany(User, { through: 'userRole' })
  // }

  UserSchema.prototype.setPassword = function(password) {
    if (!password) {
      throw new Error('Password is required')
    }
    const user = this
    return new Promise((resolve, reject) =>
      bcrypt.hash(password, bcrypt.genSaltSync(8), null, (err, hash) => {
        if (hash) {
          user.hash = hash
          return resolve(user)
        }

        return reject(err)
      })
    )
  }

  UserSchema.prototype.authenticate = async function(password) {
    if (bcrypt.compareSync(password, this.hash)) {
      return this
    }

    throw new Error('Invalid password')
  }

  UserSchema.register = async function(username, password) {
    let user = await UserSchema.findOne({
      where: {
        username
      }
    })

    if (user) {
      throw new Error('Username already exists')
    }

    user = this.build({ username })

    await user.setPassword(password)

    return user.save()
  }

  UserSchema.authenticate = () => async (username, password) => {
    let user = await UserSchema.findOne({
      where: {
        username
      }
    })

    if (!user) {
      throw new Error('Incorrect username')
    }

    return user.authenticate(password)
  }

  UserSchema.sync({ force: true }).then(async () => {
    // const newUser = UserSchema.build({
    //   username: 'user',
    //   roleCode: 'admin'
    // })
    // await newUser.setPassword('Aaa123+')
    // return newUser.save()
  })

  return UserSchema
}
