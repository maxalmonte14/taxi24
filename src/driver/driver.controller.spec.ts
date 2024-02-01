import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { Driver } from './entities/driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { NotFoundException } from '@nestjs/common';

describe('DriverController', () => {
  let controller: DriverController;
  let service: DriverService;
  const resultset = [
    new Driver({
      id: 1,
      name: 'John Doe',
      profile_picture: 'https://example.com/picture1.jpeg',
    }),
    new Driver({
      id: 2,
      name: 'Jane Doe',
      profile_picture: 'https://example.com/picture2.jpeg',
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [DriverService, ConfigService, DatabaseService],
    }).compile();

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

  it('can get all available drivers', async () => {
    const result = resultset.filter((driver) => driver.id == 1);

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findAll(true)).resolves.toBe(result);
  });

  it('can get all non-available drivers', async () => {
    const result = resultset.filter((driver) => driver.id == 2);

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findAll(false)).resolves.toBe(result);
  });

  it('can get all available drivers in a 3 kilometers radius', async () => {
    jest
      .spyOn(service, 'findInRadius')
      .mockImplementation(() => Promise.resolve(resultset));

    expect(controller.findAll(false)).resolves.toBe(resultset);
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
});
