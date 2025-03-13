import { Importance } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsEnum(Importance)
  importance: Importance;
}

export class QueryTaskDto {
  @IsOptional()
  @IsEnum(Importance)
  importance: Importance;

  @IsOptional()
  @IsString()
  search: string;
}
