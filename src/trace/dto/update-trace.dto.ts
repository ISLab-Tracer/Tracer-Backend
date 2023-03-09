import { IsOptional, IsString } from 'class-validator';

export class UpdateTraceDto {
  @IsString()
  @IsOptional()
  trace_id?: string;

  @IsString()
  @IsOptional()
  location_id: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  equipment_id: string;

  @IsString()
  @IsOptional()
  trace_title: string;

  @IsString()
  @IsOptional()
  location_desc: string;
}
