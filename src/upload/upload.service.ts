import { Injectable } from '@nestjs/common';
import { UploadDto } from './dto';
import * as fs from 'fs';
import { uploadFileURL } from 'src/config/multer.options';

@Injectable()
export class UploadService {
  constructor() {}
  async multiFileUpload(files: Express.Multer.File[], uploadDto: UploadDto) {
    try {
      const { upload_path, file_name } = uploadDto;

      if (!fs.existsSync(upload_path)) {
        fs.mkdirSync(upload_path);
      }

      const result = files.map((file) => {
        this.uploadFile(file, upload_path, file_name);
      });
    } catch (e) {
      throw e;
    }
  }

  uploadFile(
    file: Express.Multer.File,
    uploadFilePath: string,
    fileName: string
  ) {
    try {
      //파일 이름
      const fn = `${fileName}.png`;
      //파일 업로드 경로
      const uploadPath = __dirname + `/../../${uploadFilePath + '/' + fn}`;

      //파일 생성
      fs.writeFileSync(uploadPath, file.buffer); // file.path 임시 파일 저장소

      return uploadFileURL(uploadFilePath + '/' + fn);
    } catch (e) {
      throw e;
    }
  }
}
