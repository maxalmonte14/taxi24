import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { RideStatus } from '../entities/ride-status';

export class GetRidesQueryParams {
  @IsOptional()
  @IsEnum(RideStatus)
  @ApiProperty({
    description:
      'One of four possible values representing the state of the ride',
    enum: ['pending', 'active', 'completed', 'cancelled'],
    required: false,
  })
  status?: RideStatus;
}
