import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UseInterceptors,
  Bind,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerMemoryOptions } from 'src/config/multer.options';
import { UploadDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  async uploadFiles(
    @Res() res: Response,
    files: Express.Multer.File[],
    @Body() uploadDto: UploadDto
  ) {
    try {
      const result = await this.uploadService.multiFileUpload(files, uploadDto);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
