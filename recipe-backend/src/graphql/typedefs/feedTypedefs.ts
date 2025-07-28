import gql from "graphql-tag";

export const feedTypeDefs = gql`
  type Post {
    publicId: String!
    likes: Int
    recipePublicId: String
    imageUrl: String
    description: String
    user: User
  }

  type User {
    publicId: String!
    fullName: String
    imageUrl: String
  }

  type Query {
    getFeed(limit: Int): [Post!]!
  }
`;