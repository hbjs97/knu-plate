import { Request, Response, Router } from 'express';
import { enrollMenu } from '../controller/menu.controller';
import { changeModelTimestamp, errorHandler } from '../lib/common';
import { BAD_REQUEST, INTERNAL_ERROR, OK } from '../lib/constant';
import { DB } from '../lib/sequelize';

const router = Router();

/**
 * @swagger
 * /api/menu:
 *  post:
 *    tags: [메뉴]
 *    summary: 메뉴 등록
 *    parameters:
 *      - in: formData
 *        type: number
 *        required: true
 *        name: mall_id
 *        description: 매장 아이디
 *      - in: formData
 *        type: string
 *        required: true
 *        name: menu_name
 *        description: 메뉴 이름
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: bad request
 *      500:
 *        description: internal error
 */
router.post(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const mall_id = Number(req.body.mall_id);
    const menu_name = <string>req.body.menu_name;

    if (!mall_id || !menu_name) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const enrolledMenu = await enrollMenu(mall_id, menu_name);
    if (typeof enrolledMenu == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledMenu });
    }

    res.status(OK).json(enrolledMenu);
  })
);

export default router;
