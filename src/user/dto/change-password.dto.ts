import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  user_pre_password?: string;

  @IsString()
  @IsOptional()
  user_new_password?: string;
}
