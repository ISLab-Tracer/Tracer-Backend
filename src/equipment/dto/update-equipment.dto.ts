import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEquipmentDto {
  @IsString()
  @IsOptional()
  equipment_id: string;

  @IsString()
  @IsOptional()
  equipment_nm?: string;

  @IsString()
  @IsOptional()
  equipment_desc?: string;

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

  @IsString()
  @IsOptional()
  category_id?: string;

  @IsString()
  @IsOptional()
  project_id?: string;
}
