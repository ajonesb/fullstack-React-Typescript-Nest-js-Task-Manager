import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
