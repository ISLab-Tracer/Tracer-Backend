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
  user_nequipment_thumbnailm?: string;

  @IsNumber()
  @IsOptional()
  equipment_price?: number;

  @IsNumber()
  @IsOptional()
  equipment_qty?: number;
}
