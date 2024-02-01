import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PassengerModule } from '../src/passenger/passenger.module';
import { PassengerService } from '../src/passenger/passenger.service';
import { PassengerServiceMock } from './mocks/services/passenger.service.mock';

describe('PassengerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PassengerModule],
    })
      .overrideProvider(PassengerService)
      .useValue(new PassengerServiceMock())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/passengers (GET)', () => {
    return request(app.getHttpServer())
      .get('/passengers')
      .expect(200)
      .expect([
        {
          id: 1,
          firstName: 'Daniel',
          lastName: 'Miller',
          email: 'danielmiller@example.com',
          profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
        },
        {
          id: 2,
          firstName: 'Isabella',
          lastName: 'Turner',
          email: 'isabellaturner@example.com',
          profilePicture: 'https://randomuser.me/api/portraits/women/18.jpg',
        },
        {
          id: 3,
          firstName: 'Ethan',
          lastName: 'Wright',
          email: 'ethanwright@example.com',
          profilePicture: null,
        },
        {
          id: 4,
          firstName: 'Madison',
          lastName: 'Adams',
          email: 'madisonadams@example.com',
          profilePicture: 'https://randomuser.me/api/portraits/women/9.jpg',
        },
        {
          id: 5,
          firstName: 'Jackson',
          lastName: 'Moore',
          email: 'jacksonmoore@example.com',
          profilePicture: 'https://randomuser.me/api/portraits/men/91.jpg',
        },
      ]);
  });

  it('/passengers/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/passengers/1')
      .expect(200)
      .expect({
        id: 1,
        firstName: 'Daniel',
        lastName: 'Miller',
        email: 'danielmiller@example.com',
        profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
      });
  });

  it('/passengers/999 (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/passengers/999')
      .expect(404)
      .expect({
        message: 'We could not find a passenger with id: 999.',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  it('/passengers/1/invoices (GET)', () => {
    return request(app.getHttpServer())
      .get('/passengers/1/invoices')
      .expect(200)
      .expect([
        {
          id: 1,
          price: 6.78,
          rideId: 1,
          createdAt: '2024-01-31T19:09:57.891Z',
        },
      ]);
  });

  it('/passengers/999/invoices (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/passengers/999')
      .expect(404)
      .expect({
        message: 'We could not find a passenger with id: 999.',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  it('/passengers/1/near-drivers (GET)', () => {
    return request(app.getHttpServer())
      .get('/passengers/1/near-drivers')
      .expect(200)
      .expect([
        {
          id: 4,
          firstName: 'Samantha',
          lastName: 'White',
          email: 'samanthawhite@example.com',
          licenseNumber: '0000000004',
          profilePicture: 'https://randomuser.me/api/portraits/women/41.jpg',
        },
      ]);
  });

  it('/passengers/999/near-drivers (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/passengers/999/near-drivers')
      .expect(404)
      .expect({
        message: 'We could not find a passenger with id: 999.',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
