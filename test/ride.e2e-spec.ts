import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { RideModule } from '../src/ride/ride.module';
import { RideService } from '../src/ride/ride.service';
import { RideServiceMock } from './mocks/services/ride.service.mock';
import { RideStatus } from '../src/ride/entities/ride-status';

describe('RideController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RideModule],
    })
      .overrideProvider(RideService)
      .useValue(new RideServiceMock())
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/rides (GET)', () => {
    return request(app.getHttpServer())
      .get('/rides')
      .expect(200)
      .expect([
        {
          id: 1,
          originLatitude: '18.433921976987083',
          originLongitude: '-69.95092447279306',
          destinationLatitude: '18.48564900782328',
          destinationLongitude: '-69.93931318010746',
          driverId: 1,
          passengerId: 1,
          status: RideStatus.COMPLETED,
          createdAt: '2024-01-31T19:09:57.820Z',
        },
        {
          id: 2,
          originLatitude: '18.490596135413195',
          originLongitude: '-69.97763326077538',
          destinationLatitude: '18.487234641192863',
          destinationLongitude: '-70.00017055080171',
          driverId: 2,
          passengerId: 2,
          status: RideStatus.ACTIVE,
          createdAt: '2024-01-31T19:09:57.823Z',
        },
        {
          id: 3,
          originLatitude: '18.46379353756718',
          originLongitude: '-69.93473301349387',
          destinationLatitude: '18.460822788714104',
          destinationLongitude: '-69.91942939559058',
          driverId: 3,
          passengerId: 3,
          status: RideStatus.COMPLETED,
          createdAt: '2024-01-31T19:09:57.825Z',
        },
        {
          id: 4,
          originLatitude: '18.472223335418633',
          originLongitude: '-69.90846986883439',
          destinationLatitude: '18.476417326071143',
          destinationLongitude: '-69.88324792276927',
          driverId: 4,
          passengerId: 4,
          status: RideStatus.ACTIVE,
          createdAt: '2024-01-31T19:09:57.827Z',
        },
        {
          id: 5,
          originLatitude: '18.48838672254915',
          originLongitude: '-69.89557057973872',
          destinationLatitude: '18.5442965460169',
          destinationLongitude: '-69.86048468939171',
          driverId: 5,
          passengerId: 5,
          status: RideStatus.COMPLETED,
          createdAt: '2024-01-31T19:09:57.830Z',
        },
      ]);
  });

  it('/rides (POST) 400', () => {
    return request(app.getHttpServer())
      .post('/rides')
      .send({})
      .expect(400)
      .expect({
        message: [
          'originLatitude must be a latitude string or number',
          'originLongitude must be a longitude string or number',
          'destinationLatitude must be a latitude string or number',
          'destinationLongitude must be a longitude string or number',
          'driverId must not be less than 1',
          'driverId must be an integer number',
          'passengerId must not be less than 1',
          'passengerId must be an integer number',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
