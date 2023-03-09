import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSignInDto {
  @IsString()
  @IsNotEmpty()
  user_email: string;
}
