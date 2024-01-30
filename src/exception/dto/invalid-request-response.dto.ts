import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class InvalidRequestResponse {
  @ApiProperty({
    description: 'A short description of what caused the error',
    example: 'The field example cannot be empty',
  })
  message: string;

  @ApiProperty({
    description: 'The name of the error that occurred',
    example: 'Bad Request',
  })
  error: string;

  @IsInt()
  @ApiProperty({
    description: 'A three digit number representing the HTTP status code',
    example: 400,
  })
  statusCode: number;
}
