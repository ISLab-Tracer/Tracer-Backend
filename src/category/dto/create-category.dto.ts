import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  category_id?: string;

  @IsString()
  @IsOptional()
  parent_id?: string;

  @IsString()
  @IsNotEmpty()
  category_nm: string;

  @IsString()
  @IsNotEmpty()
  category_desc: string;

  @IsNumber()
  @IsOptional()
  category_level?: number;

  @IsNumber()
  @IsOptional()
  category_order?: number;
}
