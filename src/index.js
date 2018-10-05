import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { sequelize } from './sequelize'
import resolvers from './graphql/resolvers'
import schema from './graphql/schema.graphql'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

const app = express()

server.applyMiddleware({ app })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    app.listen(4000, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
