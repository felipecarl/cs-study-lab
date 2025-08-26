import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

/**
 * typeDefs = the contract of what is allower to request (schema)
 * resolvers = how to answer each field/operation of the schema
 */
const typeDefs = /* GraphQL */ `
  type Query {
    ping: String!
    serverTime: String!
  }
`

const resolvers = {
  Query: {
    ping: () => 'pong',
    serverTime: () => new Date().toISOString(),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) => {
  console.log(`🚀 GraphQL pronto em ${url}`)
})
