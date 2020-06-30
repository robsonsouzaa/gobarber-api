import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('Createuser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Robson Souza',
      email: 'robsone@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user whit same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Robson Souza',
      email: 'robson@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Robson Souza',
        email: 'robson@gmail.com',
        password: '789456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
