import User from '../../../database/models/User';

type UserByIdArgs = {
  id: number;
};

export default (parent: null, { id }: UserByIdArgs): Promise<User | null> =>
  User.findOne({ where: { id } });
