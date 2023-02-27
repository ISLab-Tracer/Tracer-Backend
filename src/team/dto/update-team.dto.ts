import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @IsNotEmpty()
  team_id: string;

  @IsString()
  @IsOptional()
  team_nm?: string;

  @IsString()
  @IsOptional()
  team_desc?: string;
}
