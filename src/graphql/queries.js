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
      pro
      createdAt
      updatedAt
      owner
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
        pro
        createdAt
        updatedAt
        owner
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
      location
      createdAt
      updatedAt
      owner
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
        location
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
