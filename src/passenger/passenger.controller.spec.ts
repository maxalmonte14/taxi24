import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { Driver } from '../driver/entities/driver.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { NotFoundException } from '@nestjs/common';
import { Passenger } from './entities/passenger.entity';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

describe('PassengerController', () => {
  let controller: PassengerController;
  let module: TestingModule;
  let service: PassengerService;
  const resultset = [
    new Passenger({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      profile_picture: 'https://example.com/picture1.jpeg',
    }),
    new Passenger({
      id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@example.com',
      profile_picture: 'https://example.com/picture2.jpeg',
    }),
  ];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [ConfigService, DatabaseService, PassengerService],
    })
      .overrideProvider(DatabaseService)
      .useValue({})
      .compile();

    controller = module.get<PassengerController>(PassengerController);
    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it can get all passengers', () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(resultset));

    expect(controller.findAll()).resolves.toBe(resultset);
  });

  it('can get a passenger by id', () => {
    const result = resultset.find((passenger) => passenger.id == 1);

    jest
      .spyOn(service, 'find')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.find(1)).resolves.toBe(result);
  });

  it('throws error when trying to get a passenger by id that does not exist', () => {
    jest.spyOn(service, 'find').mockImplementation(() => {
      throw new Error('We could not find a passenger with id: 99999.');
    });

    expect(controller.find(99999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('can get the three nearest drivers by passenger id', () => {
    const driverResultset = [
      new Driver({
        id: 6,
        first_name: 'Emily',
        last_name: 'Davis',
        email: 'emilydavis@example.com',
        profile_picture: null,
      }),
      new Driver({
        id: 4,
        first_name: 'Samantha',
        last_name: 'White',
        email: 'samanthawhite@example.com',
        profile_picture: 'https://randomuser.me/api/portraits/women/41.jpg',
      }),
      new Driver({
        id: 8,
        first_name: 'Sophia',
        last_name: 'Taylor',
        email: 'sophiataylor@example.com',
        profile_picture: 'https://randomuser.me/api/portraits/women/27.jpg',
      }),
    ];

    jest
      .spyOn(service, 'findNearDriversByPassengerId')
      .mockImplementation(() => Promise.resolve(driverResultset));

    expect(controller.findNearDrivers(1)).resolves.toBe(driverResultset);
  });

  it('throws error when trying to get nearest drivers by a passenger id that does not exist', () => {
    jest
      .spyOn(service, 'findNearDriversByPassengerId')
      .mockImplementation(() => {
        throw new Error('We could not find a driver with id: 99999.');
      });

    expect(controller.findNearDrivers(99999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('can get invoices by passenger id', () => {
    const result = [
      new Invoice({
        id: 1,
        price: 6.78,
        ride_id: 1,
        created_at: new Date('2024-01-31T19:09:57.891Z'),
      }),
    ];

    jest
      .spyOn(service, 'findInvoicesByPassengerId')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findInvoicesByPassengerId(99999)).resolves.toBe(result);
  });

  it('throws error when trying to get invoices by a passenger id that does not exist', () => {
    jest.spyOn(service, 'findInvoicesByPassengerId').mockImplementation(() => {
      throw new Error('We could not find a driver with id: 99999.');
    });

    expect(controller.findInvoicesByPassengerId(99999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  afterEach(async () => {
    await module.close();
    jest.restoreAllMocks();
  });
});
