import { ApiProperty } from '@nestjs/swagger';

export class Passenger {
  @ApiProperty({
    example: 1,
    description: 'the identifier of the resource',
    readOnly: true,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'the full name of the passenger',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/picture.jpeg',
    description: 'a URL pointing to an image file',
    type: 'string',
  })
  profilePicture: string;
}
