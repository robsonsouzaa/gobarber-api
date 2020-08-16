import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppoitmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';

let fakeAppoitmentsRepository: FakeAppoitmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppoitmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppoitmentsRepository,
    );
  });

  it('should be able to list day availability from provider', async () => {
    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
