import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { RideService } from './ride.service';

describe('RideService', () => {
  let service: RideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DatabaseService, RideService],
    }).compile();

    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
