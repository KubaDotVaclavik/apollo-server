import Sequelize from 'sequelize'
import Item from './models/Item'

export const sequelize = new Sequelize(
  'postgres://zjpppgmc:B0w09f1t__ALAlgr2GAwb1gCxXLPJvrf@horton.elephantsql.com:5432/zjpppgmc'
)

export const models = {
  Item: Item(sequelize, Sequelize)
}
