import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  user_password?: string;

  @IsString()
  @IsOptional()
  user_nm?: string;
}
