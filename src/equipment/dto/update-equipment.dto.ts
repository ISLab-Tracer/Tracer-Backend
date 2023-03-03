import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateEquipmentDto {
  @IsString()
  @IsOptional()
  equipment_id: string;

  @IsString()
  @IsOptional()
  equipment_nm: string;

  @IsString()
  @IsOptional()
  equipment_desc: string;

  @IsString()
  @IsOptional()
  user_nequipment_thumbnailm: string;
}
