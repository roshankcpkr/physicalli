/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getJobpost = /* GraphQL */ `
  query GetJobpost($id: ID!) {
    getJobpost(id: $id) {
      id
      title
      description
      image
      price
      contact
      location
      createdAt
      updatedAt
      owner
      pro
    }
  }
`;
export const listJobposts = /* GraphQL */ `
  query ListJobposts(
    $filter: ModelJobpostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobposts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        image
        price
        contact
        location
        createdAt
        updatedAt
        owner
        pro
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      email
      description
      skill
      profilepic
      createdAt
      updatedAt
      owner
      location
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        email
        description
        skill
        profilepic
        createdAt
        updatedAt
        owner
        location
      }
      nextToken
    }
  }
`;
