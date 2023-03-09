import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsOptional()
  location_id?: string;

  @IsString()
  @IsNotEmpty()
  location_nm: string;

  @IsString()
  @IsNotEmpty()
  location_desc: string;

  @IsString()
  @IsNotEmpty()
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
