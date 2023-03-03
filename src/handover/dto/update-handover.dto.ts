import { IsEnum, IsOptional, IsString } from 'class-validator';
import { HANDOVER_STATUS } from 'src/entity';

export class UpdateHandoverDto {
  @IsString()
  @IsOptional()
  handover_id?: string;

  @IsString()
  @IsOptional()
  handover_title?: string;

  @IsString()
  @IsOptional()
  handover_desc: string;

  @IsEnum(HANDOVER_STATUS)
  @IsOptional()
  handover_status?: HANDOVER_STATUS;
}
