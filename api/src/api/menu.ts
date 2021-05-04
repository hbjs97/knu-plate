import { Request, Response, Router } from 'express';
import { getMallById } from '../controller/mall.controller';
import { enrollMenu, menuDuplicateCheck } from '../controller/menu.controller';
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
 *        type: array
 *        items:
 *          type: string
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
    const menu_name: string[] = [];
    if (typeof req.body.menu_name == 'string') {
      menu_name.push(req.body.menu_name);
    } else {
      menu_name.push(...req.body.menu_name);
    }

    if (!mall_id || !menu_name.length) {
      return res.status(BAD_REQUEST).json({ error: 'input value is empty' });
    }

    const theMall = await getMallById(mall_id);
    if (typeof theMall == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: theMall });
    }
    if (theMall.is_active != 'Y') {
      return res.status(INTERNAL_ERROR).json({ error: 'inactive mall' });
    }

    const initMenuList = await Promise.all(
      menu_name.map(async (v) => {
        const theMenu = await menuDuplicateCheck(mall_id, v); // true: duplicated, false: not duplicated
        return {
          mall_id: mall_id,
          menu_name: v,
          is_duplicated: theMenu,
        };
      })
    );
    const duplicatedMenu = initMenuList.filter((v) => {
      if (v.is_duplicated == false) {
        return false;
      }
      return true;
    });

    if (duplicatedMenu.length) {
      return res
        .status(INTERNAL_ERROR)
        .json({ error: duplicatedMenu, message: 'duplicated' });
    }

    const menuList: {
      mall_id: number;
      menu_name: string;
    }[] = initMenuList
      .filter((v) => {
        if (v.is_duplicated == false) {
          return true;
        }
        return false;
      })
      .map((v) => {
        return {
          mall_id: v.mall_id,
          menu_name: v.menu_name,
        };
      });

    const enrolledMenu = await enrollMenu(menuList);
    if (typeof enrolledMenu == 'string') {
      return res.status(INTERNAL_ERROR).json({ error: enrolledMenu });
    }

    res.status(OK).json(
      enrolledMenu.map((v) => {
        delete v.date_create;
        return {
          menu_id: v.menu_id,
          menu_name: v.menu_name,
          like: v.like,
          dislike: v.dislike,
        };
      })
    );
  })
);

export default router;
