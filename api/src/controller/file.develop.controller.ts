import fs from 'fs';
import Axios from 'axios';
import FormData from 'form-data';
import { file, fileAttributes } from '../models/file';
import { STAGING_FILE_SERVER_URL } from '../lib/config';

export async function fileUploadReturnUrlDevelop(
  fileList: Express.Multer.File[]
): Promise<string | { folder: string; files: file[] }> {
  const blobNameArray = fileList[0].originalname.split('.');
  const extension = blobNameArray[blobNameArray.length - 1];
  const filePath = 'file-dev-' + fileList[0].fieldname + '/';

  const form = new FormData();
  form.append(fileList[0].fieldname, fileList[0].buffer, {
    filename: fileList[0].originalname,
  });

  let res;

  try {
    res = await Axios({
      url: STAGING_FILE_SERVER_URL + 'upload',
      method: 'post',
      data: form,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + form.getBoundary(),
      },
    });

    return `${filePath}${
      res.data[fileList[0].fieldname][0].filename
    }.${extension}`;
  } catch (error) {
    console.error(error);
    return 'upload fail';
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
