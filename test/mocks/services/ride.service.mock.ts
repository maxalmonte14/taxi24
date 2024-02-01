import { CreateRideDTO } from '../../../src/ride/dto/create-ride.dto';
import { rideDataset } from '../../datasets/ride.dataset';
import { Ride } from '../../../src/ride/entities/ride.entity';
import { RideStatus } from '../../../src/ride/entities/ride-status';

export class RideServiceMock {
  private rideDataset: Ride[];

  constructor() {
    this.rideDataset = rideDataset;
  }

  async findAll(): Promise<Ride[]> {
    return Promise.resolve(this.rideDataset);
  }

  async create(createRideDTO: CreateRideDTO): Promise<Ride> {
    const newRide = new Ride({
      id: this.rideDataset.length + 1,
      created_at: new Date('2024-01-31T20:12:51.843Z'),
      status: RideStatus.ACTIVE,
      origin_latitude: createRideDTO.origin_latitude,
      origin_longitude: createRideDTO.origin_longitude,
      destination_latitude: createRideDTO.destination_latitude,
      destination_longitude: createRideDTO.destination_longitude,
      driver_id: createRideDTO.driver_id,
      passenger_id: createRideDTO.passenger_id,
    });

    this.rideDataset.push(newRide);

    return Promise.resolve(newRide);
  }
}
