import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createUser(firstName: NonEmptyString!, lastName: NonEmptyString!): User!
  }
`;
