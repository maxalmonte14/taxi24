import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';

describe('RideController', () => {
  let controller: RideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [ConfigService, DatabaseService, RideService],
    }).compile();

    controller = module.get<RideController>(RideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
