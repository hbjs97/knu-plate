import { Request, Response, Router } from 'express';
import { getFileListFromFileFolder } from '../controller/file.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';

const router = Router();

/**
 * @swagger
 * /api/file/file_folder:
 *  get:
 *    tags: [파일]
 *    summary: 파일 폴더 조회
 *    parameters:
 *      - in: query
 *        type: string
 *        required: true
 *        name: file_folder_id
 *        description: 파일 폴더 아이디
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.get(
  '/file_folder',
  errorHandler(async (req: Request, res: Response) => {
    const file_folder_id = <string>req.query.file_folder_id;
    if (!file_folder_id) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const result = await getFileListFromFileFolder(file_folder_id);
    if (typeof result == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: result });
    }

    res.status(OK).json(result);
  })
);

export default router;
