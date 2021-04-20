import { DB } from '../lib/sequelize';
import { Op, Sequelize } from 'sequelize';
import { my_recommend } from '../models/my_recommend';
import { getMallById } from './mall.controller';
import { mall } from '../models/mall';

export async function isMyRecommend(
  user_id: string,
  mall_id: number
): Promise<boolean> {
  const isRecommend = await getMyRecommend(user_id, mall_id);
  if (typeof isRecommend == 'string') {
    return false;
  }
  return true;
}

export async function getMyRecommend(
  user_id: string,
  mall_id: number
): Promise<my_recommend | string> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }

  const theRecommend = await my_recommend.findOne({
    where: {
      user_id,
      mall_id,
      is_active: 'Y',
    },
  });
  if (!theRecommend) {
    return 'not founded';
  }
  return theRecommend;
}

export async function recommendMall(
  mall_id: number,
  user_id: string
): Promise<string> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }
  if (theMall.is_active != 'Y') {
    return 'inactive mall';
  }

  const theRecommend = await my_recommend.findOne({
    where: { user_id, mall_id },
  });
  try {
    return await DB.transaction(async (transaction) => {
      if (!theRecommend) {
        const enrolledMyRecommend = await my_recommend.create(
          { user_id, mall_id },
          { transaction }
        );
        if (!enrolledMyRecommend) {
          throw new Error('my_recommend create fail');
        }
      } else if (theRecommend.is_active == 'Y') {
        throw new Error('this mall already recommended');
      } else {
        await theRecommend.update({ is_active: 'Y' }, { transaction });
        if (theRecommend.is_active != 'Y') {
          throw new Error('my_recommend update fail');
        }
      }
      await mall.increment(
        { recommend_count: +1 },
        { where: { mall_id }, transaction }
      );
      const updatedMall = await getMallById(mall_id, transaction);
      if (typeof updatedMall == 'string') {
        return updatedMall;
      }
      if (updatedMall.recommend_count != theMall.recommend_count! + 1) {
        throw new Error('mall.recommend_count update fail');
      }
      return 'ok';
    });
  } catch (error) {
    return error.message;
  }
}

export async function deleteRecommendFromMall(
  mall_id: number,
  user_id: string
): Promise<string> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }
  if (theMall.is_active != 'Y') {
    return 'inactive mall';
  }

  const theRecommend = await my_recommend.findOne({
    where: { user_id, mall_id },
  });
  if (theRecommend?.is_active != 'Y') {
    return 'not recommended mall';
  }
  try {
    return await DB.transaction(async (transaction) => {
      await theRecommend.update({ is_active: 'N' }, { transaction });
      if (theRecommend.is_active != 'N') {
        throw new Error('my_recommend update fail');
      }

      await mall.increment(
        { recommend_count: -1 },
        { where: { mall_id }, transaction }
      );
      const updatedMall = await getMallById(mall_id, transaction);
      if (typeof updatedMall == 'string') {
        return updatedMall;
      }
      if (updatedMall.recommend_count != theMall.recommend_count! - 1) {
        throw new Error('mall.recommend_count update fail');
      }

      return 'ok';
    });
  } catch (error) {
    return error.message;
  }
}

export async function getMyRecommendList(
  user_id: string
): Promise<my_recommend[] | string> {
  const myRecommendList = await my_recommend.findAll({
    where: { user_id, is_active: 'Y' },
  });
  if (!myRecommendList.length) {
    return 'myRecommendList not founded';
  }
  return myRecommendList;
}
