const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    Posts: [Post]
    friends: [ID]
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
    commentAuthor: String!
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
    Posts(username: String): [Post]
    Post(PostId: ID!): Post
    me: User
    friends(id:ID!):Friend
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(message: String!): Post
    addComment(PostId: ID!, comment: String!): Post
    removePost(PostId: ID!): Post
    removeComment(PostId: ID!, commentId: ID!): Post
    addFriend(friendId: ID!, user: ID!):User
    removeFriend(username: String!): User
  }
`;

module.exports = typeDefs;
