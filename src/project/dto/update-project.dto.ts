import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  project_id: string;

  @IsString()
  @IsOptional()
  project_title?: string;

  @IsString()
  @IsOptional()
  project_desc?: string;
}
