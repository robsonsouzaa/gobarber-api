import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppoitmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';

let fakeAppoitmentsRepository: FakeAppoitmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppoitmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppoitmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 9, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 10, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 11, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 12, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 13, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 14, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 15, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 16, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 20, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
