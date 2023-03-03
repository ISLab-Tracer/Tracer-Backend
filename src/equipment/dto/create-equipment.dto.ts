import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  equipment_nm: string;

  @IsString()
  @IsNotEmpty()
  equipment_desc: string;

  @IsString()
  @IsOptional()
  user_nequipment_thumbnailm: string;
}
