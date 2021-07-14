import { DB } from '../lib/sequelize';
import { Op, Sequelize, Transaction } from 'sequelize';
import { review, reviewAttributes } from '../models/review';
import { getMallById } from './mall.controller';
import { menu } from '../models/menu';
import { menu_list } from '../models/menu_list';
import {
  MEDAL_CATEGORY,
  MEDAL_CATEGORY_COUNT,
  MEDAL_CATEGORY_OBJECT,
  PER_PAGE,
} from '../lib/constant';
import { getUserById } from './user.controller';
import { mall } from '../models/mall';

export async function enrollReview(
  reviewData: reviewAttributes,
  menu_info: { menu_id: number; is_like: string }[],
  transaction: Transaction,
  theMall?: mall | string
): Promise<review | string> {
  if (!theMall) {
    theMall = await getMallById(reviewData.mall_id!);
  }
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
    return 'menu_list create fail';
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

  const myReviewListLength = (
    await review.findAll({
      where: { user_id: reviewData.user_id },
      attributes: { include: [] },
      transaction,
    })
  ).length;

  if (MEDAL_CATEGORY_COUNT.includes(myReviewListLength)) {
    const medalUpdateResult = await updateMedal[
      <keyof typeof MEDAL_CATEGORY_OBJECT>myReviewListLength
    ](reviewData.user_id!, transaction);
    if (medalUpdateResult != 'ok') {
      return 'medal update fail';
    }
  }

  return await getReviewById(enrolledReview.review_id!, transaction);
}

export const updateMedal = {
  10: async (user_id: string, transaction: Transaction): Promise<string> => {
    const theUser = await getUserById(user_id);
    if (typeof theUser == 'string') {
      return theUser;
    }
    await theUser.update({ medal_id: MEDAL_CATEGORY.SILVER }, { transaction });
    if (theUser.medal_id != MEDAL_CATEGORY.SILVER) {
      return 'medal update fail';
    }
    return 'ok';
  },
  50: async (user_id: string, transaction: Transaction): Promise<string> => {
    const theUser = await getUserById(user_id);
    if (typeof theUser == 'string') {
      return theUser;
    }
    await theUser.update({ medal_id: MEDAL_CATEGORY.GOLD }, { transaction });
    if (theUser.medal_id != MEDAL_CATEGORY.GOLD) {
      return 'medal update fail';
    }
    return 'ok';
  },
};

export async function getReviewById(
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
  if (theReview.is_active != 'Y') {
    return 'inactive review';
  }
  return theReview;
}

export async function getReviewListByMallId(
  cursor: number,
  user_id?: string,
  mall_id?: number
): Promise<review[]> {
  let whereAttribute = {};
  whereAttribute = {
    review_id: {
      [Op.lt]: cursor,
    },
    is_active: 'Y',
  };
  if (user_id) {
    whereAttribute = {
      ...whereAttribute,
      user_id: user_id,
    };
  }
  if (mall_id) {
    whereAttribute = {
      ...whereAttribute,
      mall_id: mall_id,
    };
  }
  const reviewList = await review.findAll({
    order: [['review_id', 'DESC']],
    where: whereAttribute,
    include: [
      {
        association: 'user',
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            association: 'file_folder',
            include: [
              {
                association: 'files',
              },
            ],
          },
        ],
      },
      {
        association: 'file_folder',
        include: [
          {
            association: 'files',
          },
        ],
      },
    ],
    limit: PER_PAGE,
  });

  return reviewList;
}

export async function updateReviewByModel(
  reviewModel: reviewAttributes,
  transaction: Transaction
): Promise<review | string> {
  await review.update(reviewModel, {
    where: {
      review_id: reviewModel.review_id!,
    },
    transaction,
  });
  const inactivatedReview = await review.findOne({
    where: {
      review_id: reviewModel.review_id!,
    },
    transaction,
  });
  if (!inactivatedReview) {
    return 'review not founded';
  }
  if (inactivatedReview?.is_active != 'N') {
    return 'review inactivate fail';
  }
  return inactivatedReview;
}

export async function deleteReview(theReview: review): Promise<string> {
  const deletedReview = await theReview.update({ is_active: 'N' });
  if (deletedReview.is_active != 'N') {
    return 'review delete fail';
  }
  return 'ok';
}
