import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDTO {
  @IsString()
  @IsNotEmpty()
  admin_id: string;

  @IsString()
  @IsNotEmpty()
  admin_nm: string;

  @IsString()
  @IsNotEmpty()
  admin_password: string;
}
