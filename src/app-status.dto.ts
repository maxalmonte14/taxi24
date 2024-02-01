import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn } from 'class-validator';

export class AppStatus {
  @IsDate()
  @ApiProperty({ description: 'The timestamp of the request' })
  date: Date = new Date();

  @IsIn(['up', 'down'])
  @ApiProperty({
    description:
      'One of two possible value representing if the app is running or not',
    enum: ['up', 'down'],
    example: 'up',
  })
  status: 'up' | 'down' = 'down';

  constructor(partial: Partial<AppStatus>) {
    Object.assign(this, partial);
  }
}
