import gql from "graphql-tag";

export const feedTypeDefs = gql`
  type Recipe {
  publicId: String!
}

type Author {
  publicId: String!
  username: String
  fullName: String
  imageUrl: String
  headLine: String
}

type Post {
  publicId: String!
  imageUrl: String
  likeCount: Int
  content: String
  author: Author
  recipe: Recipe
}

  type Query {
    getFeed(limit: Int, cursor: String, excludeIds: [String!]): [Post!]!
  }
`;