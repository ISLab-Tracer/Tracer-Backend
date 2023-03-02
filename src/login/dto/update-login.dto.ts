import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateLoginDto {
  @IsString()
  @IsOptional()
  login_id?: string;

  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  login_duration?: string;

  @IsBoolean()
  @IsOptional()
  login_status?: boolean;
}
