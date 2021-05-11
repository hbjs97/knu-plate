import { NODE_ENV } from '../lib/config';
import { file_folder } from '../models/file_folder';
import { file, fileAttributes } from '../models/file';
import crypto from 'crypto';
import { uploadFileType } from '../lib/constant';
import { changeModelTimestamp } from '../lib/common';
import { fileTimestampable } from '../lib/type';
import { Transaction } from 'sequelize';
import { DB } from '../lib/sequelize';
import { fileUploadReturnUrlDevelop } from './file.develop.controller';

export async function fileUploadReturnUrl(
  uploader: string,
  fileList: Express.Multer.File[],
  transaction?: Transaction
): Promise<string | file_folder> {
  return await fileUploadReturnUrlDevelop(uploader, fileList, transaction);

  // TODO: production file upload logic
}

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
