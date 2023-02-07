import { gql } from "@apollo/client";

export const QUERY_POST = gql`
  query Post($postId: ID!) {
    Post(PostId: $postId) {
      commentCount
      comments {
        commentAuthor
        comment
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query Posts {
    id
    title
    message
    tags
    image
    likeCount
    username
    comments
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      friends {
        username
      }
      Posts {
        title
        message
        likeCount
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      username
      Posts {
        title
        message
        likeCount
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      username
      _id
    }
  }
`;

export const QUERY_FRIENDS = gql`
  query friends($friendsId: ID!) {
    friends(id: $friendsId) {
      friends
      username
    }
  }
`;
