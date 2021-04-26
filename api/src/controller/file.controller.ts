import { NODE_ENV, STAGING_FILE_SERVER_URL } from '../lib/config';
import { v4 as uuidV4 } from 'uuid';
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
): Promise<string | { folder: string; files: (file | null)[] }> {
  if (NODE_ENV != 'production') {
    return await fileUploadReturnUrlDevelop(fileList);
  }
  return 'pass';

  // TODO: production file upload logic

  // return { folder: folder.file_folder_id, files: filesResult };
}
