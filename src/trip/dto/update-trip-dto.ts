import { IsBoolean } from 'class-validator';

export default class UpdateTripDTO {
  @IsBoolean()
  isCompleted: boolean;
}
