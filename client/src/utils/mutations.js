import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_POST = gql`
mutation addPost($message: String!) {
    addPost(message: $message) {
      _id
      message
      username
      createdAt
      tags
      title
      comments {
        _id
        comment
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation addPost($postId: ID!, $comment: String!) {
    addComment(PostId: $postId, comment: $comment) {
      _id
      message
      title
      username
      createdAt
      comments {
        _id
        comment
        commentAuthor
        createdAt
      }
    }
  }
`;
