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

type FeedResponse {
  data: [Post!]
  cursor: String
  excludeIds: [String!]
  success: Boolean!
  message: String
}

  type Query {
    getFeed(limit: Int, cursor: String, excludeIds: [String!]): FeedResponse!
  }
`;