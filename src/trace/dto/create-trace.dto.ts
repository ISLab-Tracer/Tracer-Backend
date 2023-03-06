import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTraceDto {
  @IsString()
  @IsOptional()
  trace_id?: string;

  @IsString()
  @IsNotEmpty()
  location_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  equipment_id: string;

  @IsString()
  @IsNotEmpty()
  trace_title: string;

  @IsString()
  @IsOptional()
  location_desc: string;
}
