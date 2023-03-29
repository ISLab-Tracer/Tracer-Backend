import { Injectable } from '@nestjs/common';
import { UploadDto } from './dto';
import * as fs from 'fs';
import { uploadFileURL } from 'src/config/multer.options';

@Injectable()
export class UploadService {
  constructor() {}
  /**
   * 파일 여러개 업로드
   * --
   * @param files
   * @param uploadDto
   * @returns
   */
  async multiFileUpload(files: Express.Multer.File[], uploadDto: UploadDto) {
    try {
      const { upload_path, file_name } = uploadDto;

      if (!fs.existsSync(upload_path)) {
        fs.mkdirSync(upload_path);
      }

      const result = files.map((file) => {
        return this.uploadFile(file, upload_path, file_name);
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 단일 파일 업로드
   * --
   * @param file
   * @param uploadDto
   * @returns
   */
  async singleUpload(file: Express.Multer.File, uploadDto: UploadDto) {
    try {
      const { upload_path, file_name } = uploadDto;

      if (!fs.existsSync(upload_path)) {
        fs.mkdirSync(upload_path);
      }
      const result = this.uploadFile(file, upload_path, file_name);

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 파일 업로드
   * --
   * 메모리에 저장된 파일을 실제 파일로 만들고, URL을 return 해주는 메서드
   * @param file
   * @param uploadFilePath
   * @param fileName
   * @returns
   */
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
