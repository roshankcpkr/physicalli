/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createJobpost = /* GraphQL */ `
  mutation CreateJobpost(
    $input: CreateJobpostInput!
    $condition: ModelJobpostConditionInput
  ) {
    createJobpost(input: $input, condition: $condition) {
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
export const updateJobpost = /* GraphQL */ `
  mutation UpdateJobpost(
    $input: UpdateJobpostInput!
    $condition: ModelJobpostConditionInput
  ) {
    updateJobpost(input: $input, condition: $condition) {
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
export const deleteJobpost = /* GraphQL */ `
  mutation DeleteJobpost(
    $input: DeleteJobpostInput!
    $condition: ModelJobpostConditionInput
  ) {
    deleteJobpost(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
