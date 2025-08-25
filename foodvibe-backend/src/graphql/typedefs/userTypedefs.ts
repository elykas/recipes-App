import gql from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        publicId: String!
        username: String
        fullName: String
        imageUrl: String
        email: String
        bio: String
        headLine: String
        locale: String
        isAdmin: Boolean!
        posts: [Post!]
    }

    type Post {
        publicId: String!
        likes: Int
        recipePublicId: String
        imageUrl: String
    }

    type Query {
        getUserProfileByPublicId(publicId: String!): User
        
    }
`;
