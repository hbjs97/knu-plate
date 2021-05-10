import { DB } from '../lib/sequelize';
import { Op, Sequelize, Transaction } from 'sequelize';
import { review, reviewAttributes } from '../models/review';
import { getMallById } from './mall.controller';
import { menu } from '../models/menu';
import { menu_list } from '../models/menu_list';
import { PER_PAGE } from '../lib/constant';

export async function enrollReview(
  reviewData: reviewAttributes,
  menu_info: { menu_id: number; is_like: string }[],
  transaction: Transaction
): Promise<review | string> {
  const theMall = await getMallById(reviewData.mall_id!);
  if (typeof theMall == 'string') {
    return theMall;
  }
  if (theMall.is_active != 'Y') {
    return 'inactive mall';
  }

  const menuIdList: number[] = menu_info.map((v) => {
    return v.menu_id;
  });
  const menuList = await menu.findAll({
    where: {
      menu_id: menuIdList,
    },
  });
  if (menuList.length != menu_info.length) {
    return 'wrong menu exist';
  }

  const enrolledReview = await review.create(reviewData, { transaction });
  if (!enrolledReview) {
    throw new Error('review create fail');
  }
  const menuListArray = menuList.map((v) => {
    return {
      review_id: enrolledReview.review_id,
      menu_id: v.menu_id,
    };
  });
  const enrolledMenuList = await menu_list.bulkCreate(menuListArray, {
    transaction,
  });
  if (!enrolledMenuList.length) {
    throw new Error('menu_list create fail');
  }

  const reviewList = await review.findAll({
    where: {
      mall_id: reviewData.mall_id,
    },
    attributes: ['evaluate'],
    transaction,
  });

  let sumOfEvaluate = 0;
  reviewList.forEach((v) => {
    sumOfEvaluate += v.evaluate!;
  });

  await theMall.update(
    { evaluate_average: sumOfEvaluate / reviewList.length },
    { transaction }
  );

  await Promise.all(
    menu_info.map(async (v) => {
      const target = v.is_like == 'Y' ? 'like' : 'dislike';
      await menu.increment(
        { [target]: +1 },
        { where: { menu_id: v.menu_id }, transaction }
      );
    })
  );
  return await getReviewBuId(enrolledReview.review_id!, transaction);
}

export async function getReviewBuId(
  review_id: number,
  transaction?: Transaction
): Promise<string | review> {
  const theReview = await review.findOne({
    where: {
      review_id,
    },
    transaction,
  });
  if (!theReview) {
    return 'review not founded';
  }
  return theReview;
}

export async function getReviewListByMallId(
  mall_id: number,
  cursor: number
): Promise<review[] | string> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }

  const reviewList = await review.findAll({
    where: {
      mall_id: mall_id,
      review_id: {
        [Op.gt]: cursor,
      },
      is_active: 'Y',
    },
    include: [
      {
        association: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
    ],
    limit: PER_PAGE,
  });

  return reviewList;
}
