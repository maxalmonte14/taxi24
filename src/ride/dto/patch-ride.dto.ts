import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsIn } from 'class-validator';

export class PatchRideDTO {
  @IsIn([true])
  @Expose({ name: 'isCompleted' })
  @ApiProperty({
    description: 'A boolean representing if the ride has been completed',
    name: 'isCompleted',
  })
  is_completed: true;
}
