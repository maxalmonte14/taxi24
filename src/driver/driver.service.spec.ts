import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';

describe('DriverService', () => {
  let module: TestingModule;
  let service: DriverService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        license_number: '0000000001',
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
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'janesmith@example.com',
        license_number: '0000000002',
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
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        license_number: '0000000001',
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
        first_name: 'Samantha',
        last_name: 'White',
        email: 'samanthawhite@example.com',
        license_number: '0000000004',
        profile_picture: 'https://randomuser.me/api/portraits/women/41.jpg',
      }),
      new Driver({
        id: 6,
        first_name: 'Emily',
        last_name: 'Davis',
        email: 'emilydavis@example.com',
        license_number: '0000000006',
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
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        license_number: '0000000001',
        profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
      }),
    );
  });

  it('throws error when trying to get a driver by id that does not exist', () => {
    expect(service.find(99999)).rejects.toThrow(
      'We could not find a driver with id: 99999.',
    );
  });

  afterEach(async () => {
    await module.close();
  });
});
