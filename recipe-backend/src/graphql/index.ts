import { feedTypeDefs } from "./typedefs/feedTypedefs";
import { feedResolvers } from "./resolvers/feedResolver";
import { userTypeDefs } from "./typedefs/userTypedefs";
import { userResolvers } from "./resolvers/userResolver";

export const typeDefs = [feedTypeDefs, userTypeDefs];
export const resolvers = [feedResolvers, userResolvers];
