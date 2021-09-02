import { AWS_BUCKET_NAME, AWS_S3_URL, NODE_ENV, S3 } from '../lib/config';
import { file_folder } from '../models/file_folder';
import { file, fileAttributes } from '../models/file';
import { Transaction } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { ManagedUpload } from 'aws-sdk/clients/s3';

export async function emptyS3Directory(fileFolder: string) {
  const listParams = {
    Bucket: AWS_BUCKET_NAME,
    Prefix: `${fileFolder}/`,
  };

  const listedObjects = await S3.listObjectsV2(listParams).promise();

  if (listedObjects.Contents?.length === 0) return;

  const deleteParams = {
    Bucket: AWS_BUCKET_NAME,
    Delete: { Objects: [] as any },
  };

  listedObjects.Contents?.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await S3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory(fileFolder);
}

export async function deleteFileFolder(
  fileFolder: string,
  transaction?: Transaction
): Promise<string> {
  try {
    const fileList = await getFileListFromFileFolder(fileFolder!);
    if (typeof fileList == 'string') {
      throw new Error(fileList);
    }

    await Promise.all(
      fileList.map(async (v) => {
        await v.destroy({ transaction });
      })
    );

    await file_folder.destroy({
      where: { file_folder_id: fileFolder },
      transaction,
    });
    await emptyS3Directory(fileFolder);
    return 'ok';
  } catch (error) {
    return error.message;
  }
}

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
