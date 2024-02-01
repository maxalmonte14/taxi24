import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { Driver } from './entities/driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { NotFoundException } from '@nestjs/common';

describe('DriverController', () => {
  let controller: DriverController;
  let module: TestingModule;
  let service: DriverService;
  const resultset = [
    new Driver({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      license_number: '0000000001',
      profile_picture: 'https://example.com/picture1.jpeg',
    }),
    new Driver({
      id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@example.com',
      license_number: '0000000002',
      profile_picture: 'https://example.com/picture2.jpeg',
    }),
  ];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [DriverService, ConfigService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue({})
      .compile();

    controller = module.get<DriverController>(DriverController);
    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it can get all drivers', () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(resultset));

    expect(controller.findAll(undefined)).resolves.toBe(resultset);
  });

  it('can get all available drivers', () => {
    const result = [
      new Driver({
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        license_number: '0000000001',
        profile_picture: 'https://example.com/picture1.jpeg',
      }),
    ];

    jest
      .spyOn(service, 'findAvailable')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findAll(true)).resolves.toBe(result);
  });

  it('can get all non-available drivers', () => {
    const result = [
      new Driver({
        id: 2,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@example.com',
        license_number: '0000000002',
        profile_picture: 'https://example.com/picture2.jpeg',
      }),
    ];

    jest
      .spyOn(service, 'findAvailable')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findAll(false)).resolves.toBe(result);
  });

  it('can get all available drivers in a 3 kilometers radius', () => {
    jest
      .spyOn(service, 'findInRadius')
      .mockImplementation(() => Promise.resolve(resultset));

    expect(
      controller.findInRadius({
        latitude: '18.441797768798327',
        longitude: '-69.94382406539647',
      }),
    ).resolves.toBe(resultset);
  });

  it('can get a driver by id', () => {
    const result = resultset.find((driver) => driver.id == 1);

    jest
      .spyOn(service, 'find')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.find(1)).resolves.toBe(result);
  });

  it('throws error when trying to get a driver by id that does not exist', () => {
    jest.spyOn(service, 'find').mockImplementation(() => {
      throw new Error('We could not find a driver with id: 99999.');
    });

    expect(controller.find(99999)).rejects.toBeInstanceOf(NotFoundException);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    await module.close();
  });
});
