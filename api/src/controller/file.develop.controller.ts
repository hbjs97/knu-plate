import fs from 'fs';
import Axios from 'axios';
import FormData from 'form-data';
import { v4 as uuidV4 } from 'uuid';
import { file, fileAttributes } from '../models/file';
import { FILE_SERVER_URL } from '../lib/config';
import { DB } from '../lib/sequelize';
import { file_folder, file_folderAttributes } from '../models/file_folder';
import { Transaction } from 'sequelize/types';
import { getFileListFromFileFolder } from './file.controller';
import { user } from '../models/user';

export async function fileUploadReturnUrlDevelop(
  uploader: string,
  fileList: Express.Multer.File[],
  transaction?: Transaction
): Promise<string | file_folder> {
  const form = new FormData();
  fileList.forEach((v) => {
    form.append(v.fieldname, v.buffer, {
      filename: v.originalname,
    });
  });

  try {
    const newFileFolder = uuidV4();
    const res = await Axios({
      url: 'http://file:4200/' + 'upload/' + newFileFolder,
      method: 'post',
      data: form,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + form.getBoundary(),
      },
    });

    const fileData: file[] = res.data[fileList[0].fieldname].map(
      (v: Express.Multer.File) => {
        return {
          file_id: uuidV4(),
          path: FILE_SERVER_URL + v.path,
          original_name: v.originalname,
          extension: v.originalname.split('.')[1],
          size: v.size,
          file_folder_id: newFileFolder,
          uploader: uploader,
        };
      }
    );

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
    // console.error(error);
    return error.message || 'upload fail';
  }
}

export async function deleteFileDevelop(
  models: fileAttributes[]
): Promise<string[]> {
  try {
    const path = '/var/www/html/bucket/' + models[0].original_name;

    fs.unlinkSync(path);

    return ['ok'];
  } catch (err) {
    console.error(err);
    return ['error'];
  }
}

export async function deleteFileFolderDevelop(
  userModel: user,
  models: file_folderAttributes,
  transaction?: Transaction
): Promise<string> {
  try {
    await Axios({
      url: 'http://file:4200/' + 'delete/' + models.file_folder_id,
      method: 'delete',
    });

    const fileList = await getFileListFromFileFolder(models.file_folder_id!);
    if (typeof fileList == 'string') {
      throw new Error(fileList);
    }

    await Promise.all(
      fileList.map(async (v) => {
        await v.destroy();
      })
    );

    await userModel.update({ user_thumbnail: null, transaction });
    if (userModel.user_thumbnail) {
      throw new Error('user_thumbnail empty fail');
    }

    await file_folder.destroy({
      where: { file_folder_id: models.file_folder_id },
    });
    return 'ok';
  } catch (error) {
    // console.error(err);
    return error.message;
  }
}
