import { ApiProperty } from '@nestjs/swagger';

export class Ride {
  @ApiProperty({
    example: 1,
    description: 'the identifier of the resource',
    readOnly: true,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    example: '18.4636960171801',
    description: 'a valid latitude represented as a floating point number',
    type: 'string',
  })
  originLatitude: string;

  @ApiProperty({
    example: '-69.93474882920843',
    description: 'a valid longitude represented as a floating point number',
    type: 'string',
  })
  originLongitude: string;

  @ApiProperty({
    example: '18.47553627458603',
    description: 'a valid latitude represented as a floating point number',
    type: 'string',
  })
  destinationLatitude: string;

  @ApiProperty({
    example: '-69.94349904538785',
    description: 'a valid longitude represented as a floating point number',
    type: 'string',
  })
  destinationLongitude: string;

  @ApiProperty({
    example: true,
    description: 'a boolean value representing is the ride has been completed',
    type: 'boolean',
  })
  isCompleted: boolean;

  @ApiProperty({
    example: 1,
    description: 'the identifier of the driver associated with this resource',
    readOnly: true,
    type: 'integer',
  })
  driverId: number;

  @ApiProperty({
    example: 1,
    description:
      'the identifier of the passenger associated with this resource',
    readOnly: true,
    type: 'integer',
  })
  passengerId: number;
}
