import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { Driver } from '../driver/entities/driver.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { Passenger } from './entities/passenger.entity';
import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let module: TestingModule;
  let service: PassengerService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [ConfigService, DatabaseService, PassengerService],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get all passengers', async () => {
    const passengers: Array<Passenger> = await service.findAll();

    expect(passengers).toBeInstanceOf(Array<Passenger>);
    expect(passengers).toHaveLength(10);
  });

  it('can get a passenger by id', async () => {
    const passenger: Passenger = await service.find(1);

    expect(passenger).toBeInstanceOf(Passenger);
    expect(passenger).toEqual(
      new Passenger({
        id: 1,
        first_name: 'Daniel',
        last_name: 'Miller',
        email: 'danielmiller@example.com',
        profile_picture: 'https://randomuser.me/api/portraits/men/75.jpg',
      }),
    );
  });

  it('throws error when trying to get a passenger by id that does not exist', () => {
    expect(service.find(99999)).rejects.toThrow(
      'We could not find a passenger with id: 99999.',
    );
  });

  it('can get the three nearest drivers by passenger id', async () => {
    const drivers: Array<Driver> =
      await service.findNearDriversByPassengerId(1);

    expect(drivers).toBeInstanceOf(Array<Driver>);
    expect(drivers).toHaveLength(3);
    expect(drivers).toEqual([
      new Driver({
        id: 6,
        first_name: 'Emily',
        last_name: 'Davis',
        email: 'emilydavis@example.com',
        license_number: '0000000006',
        profile_picture: null,
      }),
      new Driver({
        id: 4,
        first_name: 'Samantha',
        last_name: 'White',
        email: 'samanthawhite@example.com',
        license_number: '0000000004',
        profile_picture: 'https://randomuser.me/api/portraits/women/41.jpg',
      }),
      new Driver({
        id: 8,
        first_name: 'Sophia',
        last_name: 'Taylor',
        email: 'sophiataylor@example.com',
        license_number: '0000000008',
        profile_picture: 'https://randomuser.me/api/portraits/women/27.jpg',
      }),
    ]);
  });

  it('throws error when trying to get nearest drivers by a passenger id that does not exist', async () => {
    expect(service.findNearDriversByPassengerId(99999)).rejects.toThrow(
      'We could not find a passenger with id: 99999.',
    );
  });

  it('can get invoices by passenger id', async () => {
    const invoices: Array<Invoice> = await service.findInvoicesByPassengerId(1);

    expect(invoices).toBeInstanceOf(Array<Invoice>);
    expect(invoices).toHaveLength(1);
  });

  it('throws error when trying to get invoices by a passenger id that does not exist', () => {
    expect(service.findInvoicesByPassengerId(99999)).rejects.toThrow(
      'We could not find a passenger with id: 99999.',
    );
  });

  afterEach(async () => {
    await module.close();
  });
});
