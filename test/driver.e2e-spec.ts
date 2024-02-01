import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { DriverModule } from '../src/driver/driver.module';
import { DriverService } from '../src/driver/driver.service';
import { DriverServiceMock } from './mocks/services/driver.service.mock';

describe('DriverController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DriverModule],
    })
      .overrideProvider(DriverService)
      .useValue(new DriverServiceMock())
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/drivers (GET)', () => {
    return request(app.getHttpServer())
      .get('/drivers')
      .expect(200)
      .expect([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          licenseNumber: '0000000001',
          profilePicture: 'https://randomuser.me/api/portraits/men/76.jpg',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'janesmith@example.com',
          licenseNumber: '0000000002',
          profilePicture: 'https://randomuser.me/api/portraits/women/16.jpg',
        },
        {
          id: 3,
          firstName: 'Robert',
          lastName: 'Johnson',
          email: 'robertjohnson@example.com',
          licenseNumber: '0000000003',
          profilePicture: null,
        },
        {
          id: 4,
          firstName: 'Samantha',
          lastName: 'White',
          email: 'samanthawhite@example.com',
          licenseNumber: '0000000004',
          profilePicture: 'https://randomuser.me/api/portraits/women/41.jpg',
        },
        {
          id: 5,
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michaelbrown@example.com',
          licenseNumber: '0000000005',
          profilePicture: 'https://randomuser.me/api/portraits/men/90.jpg',
        },
      ]);
  });

  it('/drivers?available=true (GET)', () => {
    return request(app.getHttpServer())
      .get('/drivers?available=true')
      .expect(200)
      .expect([
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'janesmith@example.com',
          licenseNumber: '0000000002',
          profilePicture: 'https://randomuser.me/api/portraits/women/16.jpg',
        },
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

  it('/drivers?available=false (GET)', () => {
    return request(app.getHttpServer())
      .get('/drivers?available=false')
      .expect(200)
      .expect([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          licenseNumber: '0000000001',
          profilePicture: 'https://randomuser.me/api/portraits/men/76.jpg',
        },
        {
          id: 3,
          firstName: 'Robert',
          lastName: 'Johnson',
          email: 'robertjohnson@example.com',
          licenseNumber: '0000000003',
          profilePicture: null,
        },
        {
          id: 5,
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michaelbrown@example.com',
          licenseNumber: '0000000005',
          profilePicture: 'https://randomuser.me/api/portraits/men/90.jpg',
        },
      ]);
  });

  it('/drivers/nearby?latitude=18.441799816914514&longitude=-69.94358365259161 (GET)', () => {
    return request(app.getHttpServer())
      .get(
        '/drivers/nearby?latitude=18.441799816914514&longitude=-69.94358365259161',
      )
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

  it('/drivers/nearby (GET) 400', () => {
    return request(app.getHttpServer())
      .get('/drivers/nearby')
      .expect(400)
      .expect({
        message: [
          'latitude must be a latitude string or number',
          'longitude must be a longitude string or number',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('/drivers/1 (GET)', () => {
    return request(app.getHttpServer()).get('/drivers/1').expect(200).expect({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      licenseNumber: '0000000001',
      profilePicture: 'https://randomuser.me/api/portraits/men/76.jpg',
    });
  });

  it('/drivers/999 (GET) 404', () => {
    return request(app.getHttpServer()).get('/drivers/999').expect(404).expect({
      message: 'We could not find a driver with id: 999.',
      error: 'Not Found',
      statusCode: 404,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
