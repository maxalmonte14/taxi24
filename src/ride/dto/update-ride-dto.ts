import { IsBoolean } from 'class-validator';

export default class UpdateRideDTO {
  @IsBoolean()
  isCompleted: boolean;
}
