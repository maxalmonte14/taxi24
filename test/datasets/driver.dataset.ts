import { Driver } from '../../src/driver/entities/driver.entity';

export const driverDataset = [
  new Driver({
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    license_number: '0000000001',
    profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
  }),
  new Driver({
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'janesmith@example.com',
    license_number: '0000000002',
    profile_picture: 'https://randomuser.me/api/portraits/women/16.jpg',
  }),
  new Driver({
    id: 3,
    first_name: 'Robert',
    last_name: 'Johnson',
    email: 'robertjohnson@example.com',
    license_number: '0000000003',
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
    id: 5,
    first_name: 'Michael',
    last_name: 'Brown',
    email: 'michaelbrown@example.com',
    license_number: '0000000005',
    profile_picture: 'https://randomuser.me/api/portraits/men/90.jpg',
  }),
];
