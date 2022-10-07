/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateJobpost = /* GraphQL */ `
  subscription OnCreateJobpost($owner: String) {
    onCreateJobpost(owner: $owner) {
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
export const onUpdateJobpost = /* GraphQL */ `
  subscription OnUpdateJobpost($owner: String) {
    onUpdateJobpost(owner: $owner) {
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
export const onDeleteJobpost = /* GraphQL */ `
  subscription OnDeleteJobpost($owner: String) {
    onDeleteJobpost(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
