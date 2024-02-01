import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class FindInRadiusQueryParams {
  @IsLatitude()
  @ApiProperty({
    description: 'A valid latitude represented as a floating point number',
    example: '18.4636960171801',
    required: true,
  })
  latitude: string;

  @IsLongitude()
  @ApiProperty({
    description: 'A valid longitude represented as a floating point number',
    example: '-69.93474882920843',
    required: true,
  })
  longitude: string;
}
