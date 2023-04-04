import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @IsOptional()
  equipment_id: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  project_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  equipment_nm: string;

  @IsString()
  @IsNotEmpty()
  equipment_desc: string;

  @IsString()
  @IsOptional()
  equipment_thumbnail?: string;

  @IsOptional()
  equipment_price?: any;

  @IsOptional()
  equipment_qty?: any;

  @IsString()
  @IsOptional()
  equipment_barcode?: string;
}
