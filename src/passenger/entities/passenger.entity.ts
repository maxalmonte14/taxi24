import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsUrl, Min } from 'class-validator';

export class Passenger {
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The identifier of the resource', example: 1 })
  id: number;

  @ApiProperty({
    description: 'The full name of the passenger',
    example: 'John Doe',
  })
  name: string;

  @IsUrl()
  @Expose({ name: 'profilePicture' })
  @ApiPropertyOptional({
    description: 'A URL pointing to an image file',
    example: 'https://example.com/picture.jpeg',
    name: 'profilePicture',
  })
  profile_picture?: string;

  constructor(partial: Partial<Passenger>) {
    Object.assign(this, partial);
  }
}
