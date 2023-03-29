import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  upload_path: string;

  @IsString()
  @IsNotEmpty()
  file_name: string;
}
