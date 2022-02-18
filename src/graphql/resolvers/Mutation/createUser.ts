import User from '../../../database/models/User';

type CreateUserArgs = {
  firstName: string;
  lastName: string;
};

export default (
  parent: null,
  { firstName, lastName }: CreateUserArgs
): Promise<User> => User.create({ firstName, lastName });
