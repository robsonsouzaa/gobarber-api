import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CachProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('Createuser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Robson Souza',
      email: 'robsone@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user whit same email from another', async () => {
    await createUser.execute({
      name: 'Robson Souza',
      email: 'robson@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Robson Souza',
        email: 'robson@gmail.com',
        password: '789456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
