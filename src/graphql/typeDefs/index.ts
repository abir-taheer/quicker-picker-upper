import Mutation from './Mutation';
import Query from './Query';
import scalars from './scalars';
import User from './User';

const typeDefs = [Mutation, User, Query, scalars];

export default typeDefs;
