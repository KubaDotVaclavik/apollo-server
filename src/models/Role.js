export const actions = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
}

export default (sequelize, Sequelize) => {
  const RoleSchema = sequelize.define('szn_role', {
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    textPermissions: {
      type: Sequelize.STRING
    }
  })

  // RoleSchema.associate = function({ User }) {
  //   this.hasMany(User, { as: 'papers' })
  //   // this.hasMany(User, { foreignKey: 'roleCode' })
  //   // this.belongsToMany(User, { through: 'userRole' })
  // }

  RoleSchema.sync({ force: true }).then(async () => {
    // Table created
    // await RoleSchema.create({
    //   code: 'user',
    //   textPermissions: [actions.READ]
    // })
    // await RoleSchema.create({
    //   code: 'admin',
    //   textPermissions: [
    //     actions.READ,
    //     actions.CREATE,
    //     actions.UPDATE,
    //     actions.DELETE
    //   ]
    // })
  })

  return RoleSchema
}
