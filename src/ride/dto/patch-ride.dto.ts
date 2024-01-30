import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Equals } from 'class-validator';

export class PatchRideDTO {
  @Equals(true, { message: () => 'isCompleted must be equal to true' })
  @Expose({ name: 'isCompleted' })
  @ApiProperty({
    description: 'A boolean representing if the ride has been completed',
    name: 'isCompleted',
  })
  is_completed: true;
}
