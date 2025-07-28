import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { typeDefs } from './schemas/userSchema';
import { userResolvers } from './resolvers/userResolver';

export const setupGraphQL = async(app: Application) =>{
  const server = new ApolloServer({
    typeDefs,
    resolvers: userResolvers,
  });

  await server.start();
}
