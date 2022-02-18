import { resolvers as ScalarResolvers } from 'graphql-scalars';
import Mutation from './Mutation';
import Query from './Query';

const resolvers = {
  Mutation,
  Query,
  ...ScalarResolvers,
};

export default resolvers;
