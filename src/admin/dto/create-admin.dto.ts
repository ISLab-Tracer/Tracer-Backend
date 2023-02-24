import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDTO {
  @IsString()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  user_password: string;

  @IsString()
  @IsNotEmpty()
  user_nm: string;
}
