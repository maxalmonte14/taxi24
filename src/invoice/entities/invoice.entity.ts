import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsDecimal, IsInt, MaxLength, Min } from 'class-validator';

export class Invoice {
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The identifier of the resource', example: 1 })
  id: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @MaxLength(8)
  @Min(1)
  @ApiProperty({
    description:
      'A floating point number with a max of five numbers before the decimal point, and two after it',
    example: 6.01,
  })
  price: number;

  @IsInt()
  @Min(1)
  @Expose({ name: 'rideId' })
  @ApiProperty({
    description: 'The identifier of the ride associated with this resource',
    name: 'rideId',
  })
  ride_id: number;

  @IsDate()
  @Expose({ name: 'createdAt' })
  @ApiProperty({
    description: 'A timestamp representing when the resource was created',
    name: 'createdAt',
  })
  created_at: Date;

  constructor(partial: Partial<Invoice>) {
    Object.assign(this, partial);
  }
}
