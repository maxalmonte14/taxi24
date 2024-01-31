import { Passenger } from '../../src/passenger/entities/passenger.entity';

export const passengerDataset: Passenger[] = [
  new Passenger({
    id: 1,
    name: 'Daniel Miller',
    profile_picture: 'https://randomuser.me/api/portraits/men/75.jpg',
  }),
  new Passenger({
    id: 2,
    name: 'Isabella Turner',
    profile_picture: 'https://randomuser.me/api/portraits/women/18.jpg',
  }),
  new Passenger({
    id: 3,
    name: 'Ethan Wright',
    profile_picture: null,
  }),
  new Passenger({
    id: 4,
    name: 'Madison Adams',
    profile_picture: 'https://randomuser.me/api/portraits/women/9.jpg',
  }),
  new Passenger({
    id: 5,
    name: 'Jackson Moore',
    profile_picture: 'https://randomuser.me/api/portraits/men/91.jpg',
  }),
];
