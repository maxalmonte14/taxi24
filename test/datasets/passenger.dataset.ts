import { Passenger } from '../../src/passenger/entities/passenger.entity';

export const passengerDataset: Passenger[] = [
  new Passenger({
    id: 1,
    first_name: 'Daniel',
    last_name: 'Miller',
    email: 'danielmiller@example.com',
    profile_picture: 'https://randomuser.me/api/portraits/men/75.jpg',
  }),
  new Passenger({
    id: 2,
    first_name: 'Isabella',
    last_name: 'Turner',
    email: 'isabellaturner@example.com',
    profile_picture: 'https://randomuser.me/api/portraits/women/18.jpg',
  }),
  new Passenger({
    id: 3,
    first_name: 'Ethan',
    last_name: 'Wright',
    email: 'ethanwright@example.com',
    profile_picture: null,
  }),
  new Passenger({
    id: 4,
    first_name: 'Madison',
    last_name: 'Adams',
    email: 'madisonadams@example.com',
    profile_picture: 'https://randomuser.me/api/portraits/women/9.jpg',
  }),
  new Passenger({
    id: 5,
    first_name: 'Jackson',
    last_name: 'Moore',
    email: 'jacksonmoore@example.com',
    profile_picture: 'https://randomuser.me/api/portraits/men/91.jpg',
  }),
];
