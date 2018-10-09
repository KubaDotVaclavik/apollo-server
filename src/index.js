import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { sequelize, associate } from './sequelize'
import config from './config'
import connectPg from 'connect-pg-simple'
import parser from 'body-parser'
import passport from 'passport'
import configureAuth from './auth'
import router from './api/index'
import expressSession from 'express-session'
import createExecutableSchema from './graphql/index'

sequelize
  .authenticate()
  .then(instance => {
    associate()

    const app = express()

    app.use(parser.json())

    const PgStore = connectPg(expressSession)
    app.use(
      expressSession({
        // TODO reuse PG pool
        store: new PgStore({ conString: config.dbConnectionString }),
        httpOnly: true,
        name: config.sessionName,
        resave: false,
        saveUninitialized: true,
        secret: config.sessionSecret,
        secure: config.isProduction
      })
    )

    app.use(passport.initialize())
    app.use(passport.session())
    configureAuth()

    app.use('/api', router)

    const server = new ApolloServer({
      ...createExecutableSchema(),
      context: ({ req }) => ({
        user: req.user
      })
    })

    server.applyMiddleware({ app })

    app.listen(config.port, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    )
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
