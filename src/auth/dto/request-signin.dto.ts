import { IsNotEmpty, IsString } from 'class-validator';
export class RequestSigninDto {
  @IsString()
  @IsNotEmpty()
  login_id: string;
}
