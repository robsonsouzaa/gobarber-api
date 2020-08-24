import FakeCacheProvider from '@shared/container/providers/CachProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppoitmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';

let fakeAppoitmentsRepository: FakeAppoitmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppoitmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppoitmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppoitmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppoitmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 8,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
