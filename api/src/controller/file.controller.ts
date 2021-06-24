import { AWS_BUCKET_NAME, AWS_S3_URL, NODE_ENV, S3 } from '../lib/config';
import { file_folder } from '../models/file_folder';
import { file, fileAttributes } from '../models/file';
import crypto from 'crypto';
import { uploadFileType } from '../lib/constant';
import { changeModelTimestamp } from '../lib/common';
import { fileTimestampable } from '../lib/type';
import { Transaction } from 'sequelize';
import { DB } from '../lib/sequelize';
import { fileUploadReturnUrlDevelop } from './file.develop.controller';
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import { ManagedUpload } from 'aws-sdk/clients/s3';

export async function fileUploadReturnUrl(
  uploader: string,
  fileList: Express.Multer.File[],
  transaction?: Transaction
): Promise<string | file_folder> {
  // if (NODE_ENV == 'development') {
  //   return await fileUploadReturnUrlDevelop(uploader, fileList, transaction);
  // }

  try {
    const newFileFolder = uuidV4();
    const fileData: fileAttributes[] = fileList.map((file) => {
      const newFile = uuidV4();
      const uploadParams = {
        Bucket: AWS_BUCKET_NAME, // bucket name
        Body: file.buffer, // buffer
        Key: `${newFileFolder}/${newFile}`, // dest
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      S3.upload(uploadParams).promise();

      return {
        file_id: newFile,
        path: `${AWS_S3_URL}/${newFileFolder}/${newFile}`,
        original_name: file.originalname,
        extension: file.originalname.split('.')[1],
        size: file.size.toString(),
        file_folder_id: newFileFolder,
        uploader: uploader,
      };
    });
    const folder = await file_folder.create(
      {
        file_folder_id: newFileFolder,
        type: fileList[0].fieldname,
      },
      { transaction }
    );
    if (!folder) {
      throw new Error('file_folder create fail');
    }

    await file.bulkCreate(fileData, { transaction });
    return folder;
  } catch (error) {
    return error.message || 'upload fail';
  }
}

// export async function initMallFileFolder(
//   uploader: string,
//   transaction?: Transaction
// ): Promise<string | file_folder> {
//   try {
//     const newFileFolder = uuidV4();
//     const uploadParams = {
//       Bucket: AWS_BUCKET_NAME,
//       Body: '',
//       Key: `${newFileFolder}/`,
//       ACL: 'public-read',
//     };

//     S3.upload(uploadParams).promise();

//     const folder = await file_folder.create(
//       {
//         file_folder_id: newFileFolder,
//         type: 'thumbnail',
//       },
//       { transaction }
//     );
//     if (!folder) {
//       throw new Error('file_folder create fail');
//     }

//     return folder;
//   } catch (error) {
//     return error.message || 'mall folder init fail';
//   }
// }

export async function getFileFolderById(
  file_folder_id: string
): Promise<file_folder | string> {
  const theFileFolder = await file_folder.findOne({
    where: { file_folder_id },
  });
  if (!theFileFolder) {
    return 'file_folder not founded';
  }
  return theFileFolder;
}

export async function getFileListFromFileFolder(
  file_folder_id: string
): Promise<string | file[]> {
  const theFileFolder = await file_folder.findOne({
    where: {
      file_folder_id,
    },
  });
  if (!theFileFolder) {
    return 'file_folder not founded';
  }

  const fileList = await file.findAll({ where: { file_folder_id } });

  return fileList;
}

export async function uploadFileToS3Bucket(
  file: Express.Multer.File
): Promise<ManagedUpload.SendData> {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME, // bucket name
    Body: file.buffer, // buffer
    Key: file.originalname, // dest
    ContentType: file.mimetype,
    ACL: 'public-read-write',
  };

  return S3.upload(uploadParams).promise();
}
