import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsOptional()
  login_id?: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsBoolean()
  @IsOptional()
  login_status?: boolean;
}
