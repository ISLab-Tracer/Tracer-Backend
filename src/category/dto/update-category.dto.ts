import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  category_id?: string;

  @IsString()
  @IsOptional()
  parent_id?: string;

  @IsString()
  @IsOptional()
  category_nm?: string;

  @IsString()
  @IsOptional()
  category_desc?: string;

  @IsNumber()
  @IsOptional()
  category_level?: number;

  @IsNumber()
  @IsOptional()
  category_order?: number;
}
