import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  team_nm: string;

  @IsString()
  @IsNotEmpty()
  team_desc: string;
}
