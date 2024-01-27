import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsPositive,
  Min,
} from 'class-validator';

export default class CreateTripDTO {
  @IsLatitude()
  originLatitude: string;

  @IsLongitude()
  originLongitude: string;

  @IsLatitude()
  destinationLatitude: string;

  @IsLongitude()
  destinationLongitude: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  driverId: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  passengerId: number;
}
