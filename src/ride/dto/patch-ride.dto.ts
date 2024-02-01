import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { RideStatus } from '../entities/ride-status';

export class PatchRideDTO {
  @IsIn([RideStatus.CANCELLED, RideStatus.COMPLETED])
  @ApiProperty({
    description: 'A boolean representing if the ride has been completed',
  })
  status: true;
}
