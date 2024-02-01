import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsUrl, Min } from 'class-validator';

export class Passenger {
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The identifier of the resource', example: 1 })
  id: number;

  @IsNotEmpty()
  @Expose({ name: 'firstName' })
  @ApiProperty({
    description: 'The first name of the passenger',
    example: 'John',
  })
  first_name: string;

  @IsNotEmpty()
  @Expose({ name: 'lastName' })
  @ApiProperty({
    description: 'The last name of the passenger',
    example: 'Doe',
    name: 'lastName',
  })
  last_name: string;

  @IsEmail()
  @ApiProperty({
    description: 'A valid email',
    example: 'johndoe@example.con',
  })
  email: string;

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
