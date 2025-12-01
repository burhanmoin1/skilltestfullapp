import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    token: req.headers.token,
    role: 'ADMIN',
  }),
});

console.log(`🚀 Server ready at ${url}`);
console.log('CORS is enabled for all origins');
