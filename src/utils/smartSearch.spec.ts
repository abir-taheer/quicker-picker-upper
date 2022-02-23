import smartSearch from './smartSearch';
import User from '../database/models/User';
import faker from '@faker-js/faker';
import { expect } from 'chai';

describe('smartSearch', async () => {
  const users: User[] = [];

  before('insert test users', async () => {
    for (let i = 0; i < 10; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);

      const user = await User.create({
        firstName,
        lastName,
        email,
      });

      users.push(user);
    }
  });

  it('Should be able to find a user based on their email', async () => {
    const expectedResult = users[0];
    const search = expectedResult.email.substring(0, 4);

    const { results } = await smartSearch({
      search,
      model: User,
      fields: ['email'],
      page: 1,
      resultsPerPage: 15,
    });

    expect(results).to.be.an('array');

    const ids = results.map((result) => result.id);

    expect(ids).to.include(expectedResult.id);
  });

  after('delete all the test users we created', () => {
    User.destroy({
      where: {
        // Delete all the users that we just created
        id: users.map((user) => user.id),
      },
    });
  });
});
