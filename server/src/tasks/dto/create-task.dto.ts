import { IsNotEmpty, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean = false;

  @IsOptional()
  @IsString()
  dueDate?: string;
}