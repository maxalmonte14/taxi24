import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsUrl, Min } from 'class-validator';

export class Driver {
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The identifier of the resource' })
  id: number;

  @ApiProperty({
    description: 'The full name of the driver',
    example: 'John Doe',
  })
  name: string;

  @IsUrl()
  @Expose({ name: 'profilePicture' })
  @ApiProperty({
    description: 'A URL pointing to an image file',
    example: 'https://example.com/picture.jpeg',
    name: 'profilePicture',
  })
  profile_picture?: string;

  constructor(partial: Partial<Driver>) {
    Object.assign(this, partial);
  }
}
