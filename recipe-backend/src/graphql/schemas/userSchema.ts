import gql from "graphql-tag";

export const typeDefs = gql`
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
        posts: [PostPreview!]
    }

    type PostPreview {
        publicId: String!
        likes: Int
        recipePublicId: String
        imageUrl: String
    }

    type Query {
        getUserProfileByPublicId(publicId: String!): User
    }
`;
