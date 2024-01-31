import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsLatitude,
  IsLongitude,
  Min,
} from 'class-validator';

export class Ride {
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The identifier of the resource', example: 1 })
  id: number;

  @IsLatitude({ message: 'originLatitude must be a latitude string or number' })
  @Expose({ name: 'originLatitude' })
  @ApiProperty({
    description: 'A valid latitude represented as a floating point number',
    example: '18.4636960171801',
    name: 'originLatitude',
  })
  origin_latitude: string;

  @IsLongitude({
    message: 'originLongitude must be a longitude string or number',
  })
  @Expose({ name: 'originLongitude' })
  @ApiProperty({
    description: 'A valid longitude represented as a floating point number',
    example: '-69.93474882920843',
    name: 'originLongitude',
  })
  origin_longitude: string;

  @IsLatitude({
    message: 'destinationLatitude must be a latitude string or number',
  })
  @Expose({ name: 'destinationLatitude' })
  @ApiProperty({
    description: 'A valid latitude represented as a floating point number',
    example: '18.47553627458603',
    name: 'destinationLatitude',
  })
  destination_latitude: string;

  @IsLongitude({
    message: 'destinationLongitude must be a longitude string or number',
  })
  @Expose({ name: 'destinationLongitude' })
  @ApiProperty({
    description: 'A valid longitude represented as a floating point number',
    example: '-69.94349904538785',
    name: 'destinationLongitude',
  })
  destination_longitude: string;

  @IsBoolean()
  @Expose({ name: 'isCompleted' })
  @ApiProperty({
    description: 'A boolean representing if the ride has been completed',
    name: 'isCompleted',
  })
  is_completed: boolean;

  @IsInt({ message: 'driverId must be an integer number' })
  @Min(1, { message: 'driverId must not be less than 1' })
  @Expose({ name: 'driverId' })
  @ApiProperty({
    description: 'The identifier of the driver associated with this resource',
    example: 1,
    name: 'driverId',
  })
  driver_id: number;

  @IsInt({ message: 'passengerId must be an integer number' })
  @Min(1, { message: 'passengerId must not be less than 1' })
  @Expose({ name: 'passengerId' })
  @ApiProperty({
    description:
      'The identifier of the passenger associated with this resource',
    example: 1,
    name: 'passengerId',
  })
  passenger_id: number;

  @IsDate()
  @Expose({ name: 'createdAt' })
  @ApiProperty({
    description: 'A timestamp representing when the resource was created',
    name: 'createdAt',
  })
  created_at: Date;

  constructor(partial: Partial<Ride>) {
    Object.assign(this, partial);
  }
}
