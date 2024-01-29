import { Ride } from '../entities/ride.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateRideDTO extends PickType(Ride, ['is_completed'] as const) {}
