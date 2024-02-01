import { Ride } from '../entities/ride.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateRideDTO extends OmitType(Ride, [
  'id',
  'created_at',
  'status',
] as const) {}
