import { Driver } from '../../src/driver/entities/driver.entity';

export const driverDataset = [
  new Driver({
    id: 1,
    name: 'John Doe',
    profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
  }),
  new Driver({
    id: 2,
    name: 'Jane Smith',
    profile_picture: 'https://randomuser.me/api/portraits/women/16.jpg',
  }),
  new Driver({
    id: 3,
    name: 'Robert Johnson',
    profile_picture: null,
  }),
  new Driver({
    id: 4,
    name: 'Samantha White',
    profile_picture: 'https://randomuser.me/api/portraits/women/41.jpg',
  }),
  new Driver({
    id: 5,
    name: 'Michael Brown',
    profile_picture: 'https://randomuser.me/api/portraits/men/90.jpg',
  }),
];
