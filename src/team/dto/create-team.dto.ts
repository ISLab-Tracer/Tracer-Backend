import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsOptional()
  team_id?: string;

  @IsString()
  @IsNotEmpty()
  team_nm: string;

  @IsString()
  @IsNotEmpty()
  team_desc: string;
}
