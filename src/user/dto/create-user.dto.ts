import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_DIVIDE } from 'src/entity/user.entity';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  team_id: string;

  @IsString()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  user_password: string;

  @IsString()
  @IsNotEmpty()
  user_nm: string;

  @IsEnum(USER_DIVIDE)
  @IsOptional()
  user_divide?: USER_DIVIDE;
}
