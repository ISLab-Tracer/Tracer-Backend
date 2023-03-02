import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSignupDto {
  @IsString()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  user_nm: string;

  @IsString()
  @IsNotEmpty()
  user_password: string;
}
