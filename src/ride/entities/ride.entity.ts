import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class Ride {
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The identifier of the resource' })
  id: number;

  @Expose({ name: 'originLatitude' })
  @ApiProperty({
    description: 'A valid latitude represented as a floating point number',
    example: '18.4636960171801',
    name: 'originLatitude',
  })
  origin_latitude: string;

  @Expose({ name: 'originLongitude' })
  @ApiProperty({
    description: 'A valid longitude represented as a floating point number',
    example: '-69.93474882920843',
    name: 'originLongitude',
  })
  origin_longitude: string;

  @Expose({ name: 'destinationLatitude' })
  @ApiProperty({
    description: 'A valid latitude represented as a floating point number',
    example: '18.47553627458603',
    name: 'destinationLatitude',
  })
  destination_latitude: string;

  @Expose({ name: 'destinationLongitude' })
  @ApiProperty({
    description: 'A valid longitude represented as a floating point number',
    example: '-69.94349904538785',
    name: 'destinationLongitude',
  })
  destination_longitude: string;

  @Expose({ name: 'isCompleted' })
  @ApiProperty({
    description: 'A boolean representing if the ride has been completed',
    name: 'isCompleted',
  })
  is_completed: boolean;

  @Expose({ name: 'driverId' })
  @ApiProperty({
    description: ' The identifier of the driver associated with this resource',
    name: 'driverId',
  })
  driver_id: number;

  @Expose({ name: 'passengerId' })
  @ApiProperty({
    description:
      ' The identifier of the passenger associated with this resource',
    name: 'passengerId',
  })
  passenger_id: number;

  constructor(partial: Partial<Ride>) {
    Object.assign(this, partial);
  }
}
