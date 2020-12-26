// import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
// let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    // fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
      // fakeNotificationsRepository,
    );
  });

  it('deve ser permitido criar um agendamento', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123122',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('deve ser permitido criar mais de um agendamento na mesma hora', async () => {
    const appointmentDate = new Date(2021, 12, 10, 11);

    const user1 = await createAppointment.execute({
      date: appointmentDate,
      user_id: '123124',
      provider_id: '123123',
    });

    const user2 = await createAppointment.execute({
      date: appointmentDate,
      user_id: '123125',
      provider_id: '123123',
    });

    const user3 = await createAppointment.execute({
      date: appointmentDate,
      user_id: '123126',
      provider_id: '123123',
    });

    expect.arrayContaining([user1, user2, user3]);
  });

  it('não deve ser permitido criar um agendamento em uma data passada', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123122',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser permitido criar um agendamento com o próprio usuário logado', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 9).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 10),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser permitido criar um agendamento antes das 8am ou depois das 22pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 9).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: '123122',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 23),
        user_id: '123122',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
