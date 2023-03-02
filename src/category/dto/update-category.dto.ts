import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsOptional()
  category_nm?: string;

  @IsString()
  @IsOptional()
  category_desc?: string;

  @IsString()
  @IsOptional()
  parent_id?: string;
}
