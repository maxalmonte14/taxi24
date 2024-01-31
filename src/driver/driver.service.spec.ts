import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';

describe('DriverService', () => {
  let service: DriverService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DatabaseService, DriverService],
    }).compile();

    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get all drivers', async () => {
    const drivers: Array<Driver> = await service.findAll();

    expect(drivers).toBeInstanceOf(Array<Driver>);
    expect(drivers).toContainEqual(
      new Driver({
        id: 1,
        name: 'John Doe',
        profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
      }),
    );
    expect(drivers).toHaveLength(10);
  });

  it('can get all available drivers', async () => {
    const drivers: Array<Driver> = await service.findAvailable(true);

    expect(drivers).toBeInstanceOf(Array<Driver>);
    expect(drivers).toContainEqual(
      new Driver({
        id: 2,
        name: 'Jane Smith',
        profile_picture: 'https://randomuser.me/api/portraits/women/16.jpg',
      }),
    );
    expect(drivers).toHaveLength(5);
  });

  it('can get all non-available drivers', async () => {
    const drivers: Array<Driver> = await service.findAvailable(false);

    expect(drivers).toBeInstanceOf(Array<Driver>);
    expect(drivers).toContainEqual(
      new Driver({
        id: 1,
        name: 'John Doe',
        profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
      }),
    );
    expect(drivers).toHaveLength(5);
  });

  it('can get all available drivers in a 3 kilometers radius', async () => {
    const drivers: Array<Driver> = await service.findInRadius(
      '18.441797768798327',
      '-69.94382406539647',
    );

    expect(drivers).toBeInstanceOf(Array<Driver>);
    expect(drivers).toEqual([
      new Driver({
        id: 4,
        name: 'Samantha White',
        profile_picture: 'https://randomuser.me/api/portraits/women/41.jpg',
      }),
      new Driver({
        id: 6,
        name: 'Emily Davis',
        profile_picture: null,
      }),
    ]);
    expect(drivers).toHaveLength(2);
  });

  it('can get a driver by id', async () => {
    const driver: Driver = await service.find(1);

    expect(driver).toBeInstanceOf(Driver);
    expect(driver).toEqual(
      new Driver({
        id: 1,
        name: 'John Doe',
        profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
      }),
    );
  });

  it('throws error when trying to get a driver by id that does not exist', async () => {
    expect(service.find(99999)).rejects.toThrow(
      'We could not find a driver with the given id.',
    );
  });
});
