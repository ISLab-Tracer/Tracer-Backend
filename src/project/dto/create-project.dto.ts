import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsOptional()
  project_id?: string;

  @IsString()
  @IsNotEmpty()
  project_title: string;

  @IsString()
  @IsNotEmpty()
  project_desc: string;
}
