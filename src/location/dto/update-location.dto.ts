import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  location_id?: string;

  @IsString()
  @IsOptional()
  location_nm: string;

  @IsString()
  @IsOptional()
  location_desc: string;

  @IsString()
  @IsOptional()
  location_address: string;

  @IsNumber()
  @IsOptional()
  location_lat?: number;

  @IsNumber()
  @IsOptional()
  location_lon?: number;

  @IsString()
  @IsOptional()
  location_thumbnail?: string;
}
