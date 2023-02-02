const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
    friends: [User]!
  }

  type Post {
    id: ID!
    title: String!
    username: String!
    image: String!
    message: String!
    tags: [String]
    createdAt: String!
    likes: [Like]!
    comments: [Comment]!
    commentCount: Int!
    likeCount: Int!
  }

  type Comment {
    id: ID!
    username: String!
    comment: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(message: String!): Post
    addComment(postId: ID!, comment: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
