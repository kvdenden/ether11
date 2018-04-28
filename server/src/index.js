import { GraphQLServer } from 'graphql-yoga';
import { typeDefs, resolvers } from './graphql';

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(({ port }) => console.log(`Server is running on localhost:${port}`))
