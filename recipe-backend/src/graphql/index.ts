// src/graphql/index.ts
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schemas/userSchema';
import { userResolvers } from './resolvers/userResolver';

const server = new ApolloServer({ typeDefs, resolvers: userResolvers });

server.listen().then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
