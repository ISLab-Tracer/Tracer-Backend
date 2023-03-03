import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { HANDOVER_STATUS } from 'src/entity/handover.entity';

export class CreateHandoverDto {
  @IsString()
  @IsOptional()
  handover_id?: string;

  @IsString()
  @IsNotEmpty()
  equipment_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  handover_title: string;

  @IsString()
  @IsNotEmpty()
  handover_desc: string;

  @IsEnum(HANDOVER_STATUS)
  @IsOptional()
  handover_status?: HANDOVER_STATUS;
}
