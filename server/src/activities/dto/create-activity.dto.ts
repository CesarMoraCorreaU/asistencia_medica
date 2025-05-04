import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  @IsEnum(['created', 'updated', 'completed', 'deleted'])
  type: 'created' | 'updated' | 'completed' | 'deleted';

  @IsNotEmpty()
  @IsString()
  message: string;
}