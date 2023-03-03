import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSignupDto {
  @IsString()
  @IsOptional()
  signup_id?: string;

  @IsString()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  user_nm: string;
}
