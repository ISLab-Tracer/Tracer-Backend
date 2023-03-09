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
  user_nequipment_thumbnailm?: string;

  @IsNumber()
  @IsOptional()
  equipment_price?: number;

  @IsNumber()
  @IsOptional()
  equipment_qty?: number;
}
