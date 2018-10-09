import { gql } from 'apollo-server-express'

import {
  resolvers as textResolvers,
  schema as textSchema
} from './text/resolvers'
import {
  resolvers as userResolvers,
  schema as userSchema
} from './user/resolvers'

const mergeResolvers = (...resolvers) =>
  resolvers.reduce(
    (prev, current) => {
      const { Query: prevQuery, Mutation: prevMutation, ...prevRest } = prev
      const {
        Query: currentQuery,
        Mutation: currentMutation,
        ...currentRest
      } = current

      return {
        Query: { ...prevQuery, ...(currentQuery || {}) },
        Mutation: { ...prevMutation, ...(currentMutation || {}) },
        ...prevRest,
        ...currentRest
      }
    },
    { Query: {}, Mutation: {} }
  )

const rootSchema = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const rootResolvers = {
  Query: { _empty: () => '<>' },
  Mutation: { _empty: () => '<>' }
}

const createExecutableSchema = () => {
  return {
    typeDefs: [rootSchema, textSchema, userSchema],
    resolvers: {
      ...mergeResolvers(rootResolvers, textResolvers, userResolvers)
    }
  }
}

export default createExecutableSchema
