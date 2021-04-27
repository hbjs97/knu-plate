import fs from 'fs';
import Axios from 'axios';
import FormData from 'form-data';
import { v4 as uuidV4 } from 'uuid';
import { file, fileAttributes } from '../models/file';
import { FILE_SERVER_URL } from '../lib/config';
import { DB } from '../lib/sequelize';
import { file_folder } from '../models/file_folder';

export async function fileUploadReturnUrlDevelop(
  uploader: string,
  fileList: Express.Multer.File[]
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

    return await DB.transaction(async (transaction) => {
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
    });
  } catch (error) {
    console.error(error);
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
