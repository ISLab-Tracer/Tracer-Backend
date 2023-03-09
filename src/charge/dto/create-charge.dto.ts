import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChargeDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  equipment_id: string;

  @IsNumber()
  @IsOptional()
  charge_status?: boolean;
}
