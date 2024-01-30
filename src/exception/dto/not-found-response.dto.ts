import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class NotFoundResponse {
  @ApiProperty({
    description: 'A short description of what caused the error',
    example: 'We could not find a resource with the given id',
  })
  message: string;

  @ApiProperty({
    description: 'The name of the error that occurred',
    example: 'Not found',
  })
  error: string;

  @IsInt()
  @ApiProperty({
    description: 'A three digit number representing the HTTP status code',
    example: 404,
  })
  statusCode: number;
}
