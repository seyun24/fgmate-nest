import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import ApiResponseStatus from "../response/api.response.status";
import * as process from "process";

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }); // AWS S3 인스턴스 생성
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${uuid()}_${file.originalname}`;
      const uploadParams: S3.Types.PutObjectRequest = {
        Bucket: process.env.AWS_BUKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await this.s3.putObject(uploadParams).promise(); // 파일 업로드

      const fileUrl = `https://${process.env.AWS_BUKET_NAME}.s3.amazonaws.com/${fileName}`;
      return fileUrl;
    } catch (error) {
      throw ApiResponseStatus.IMAGE_UPLOAD_FAIL;
    }
  }
}
