import Query from './Query';
import { resolvers as ScalarResolvers } from 'graphql-scalars';
import Mutation from './Mutation';

const resolvers = {
  Mutation,
  Query,
  ...ScalarResolvers,
};

export default resolvers;
